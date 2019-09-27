const IDA_format = "HH:mm:ss.SSS"
const IDADataManager = new IDA()
const moment = require("moment")
const atole_format = "DDD-HH:mm:ss"
module.exports = {
    plot: async function(req, res){
        var mr = req.query["mr"]
        var test = req.query["test"]
        var charttype = req.query["type"].trim()
        var testtype = test.type
        var matches = mr.match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
        }
        if(testtype.includes("RTO")){
          var type = "RTO"
        }
        else if(testtype.includes("DECOLLAGE")){
          var type = "TO"
        }
        else if(testtype.includes("ATTERRISSAGE"))
        {
          var type = "LDG"
        }
        else{
          return res.serverError("Type could not be determined")
        }
        var config = PBVChartConfig
        var cursors_config = PBVCursorConfig
        var keys = _.pick(cursors_config[testtype], config[testtype][charttype].cursors)
        // Some cursors have to be determined by hand
        var rest = config[testtype][charttype].cursors.filter(d => Object.keys(keys).indexOf(d) < 0)
        var times = _.pick(test, Object.values(keys))
        var par = Object.values(config[testtype][charttype].pars[aircraft])
        var mnemo = Object.keys(config[testtype][charttype].pars[aircraft])
        var inverse_map = par.reduce((o, k, i) => ({...o, [k]: mnemo[i]}), {})
        var axis_config = config[testtype][charttype].axis[aircraft]
        var shift = config[testtype][charttype].shift
        if(shift !==undefined){
          par.push(shift)
          inverse_map[shift] = shift
        }
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var start = moment(test.TDEB, atole_format)
        var end = moment(test.TFIN, atole_format)
        var day = start.dayOfYear()
        var startt = start.format(IDA_format)
        var endt = end.format(IDA_format)
        // This had to be changed because of some parameter [WOW/32U0GRND--] is not in a double format ....
        var par_types = config[testtype][charttype].types
        var data_res = await IDADataManager.ReadPlotDataWithTypes(mr, startt, endt, par, 8, par_types)
        var data_summary = await IDADataManager.FetchParametersPBV(mr, PBVConfig.DATA, aircraft.substring(1), type, startt, endt)
        for(let p of par){
          data_res[inverse_map[p]] = data_res[p]
        }
        // Shift Data if there is any shift to do, see with A. Barassin
        if(shift!==undefined){
          for(let p of par){
            data_res[p].x = data_res[shift].y
          }
        }
        var text = `${charttype}, from ${startt} to ${endt}`
        var shapes = [];
        var dynamicColors = function () {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgba(" + r + "," + g + "," + b + "," + "1" + ")";
        }
        var bisect_right = function( a , x , lo, hi) {
          if(lo===undefined){lo = 0;}
          if(hi===undefined){hi = a.length - 1;}
          if ( lo < 0 ) throw new ValueError( "lo must be non-negative" ) ;
          while ( lo < hi ) {
              const mid = ( lo + hi ) / 2 | 0 ;
              if ( x <= a[mid] ) hi = mid ;
              else lo = mid + 1 ;
          }
          return lo ;
      
        }
        var cursors_color = {}
          for(let t of Object.keys(times)){
            if(shift===undefined){
              if(times[t]!=="99.99.99.999"){
                // Day has to be set (otherwise we have a shifting)
                var x = new moment.utc(times[t], "HH:mm:ss-SSS").dayOfYear(day).toISOString()
              }
              else{
                var x = new moment.utc(startt, IDA_format).dayOfYear(day).toISOString()
              }
            }
            else{
              var t_dec = PBVCursorConfig[testtype][shift]
              if(test[t_dec]!=="99.99.99.99" & test[t_dec]!==undefined){
                if(times[t]!=="99.99.99.999"){
                  // Day has to be set (otherwise we have a shifting)
                  var x = (new moment.utc(times[t], "HH:mm:ss-SSS")).diff(new moment.utc(test[t_dec], "HH:mm:ss-SSS"), 'milleseconds')/1000
                }
                else{
                  var x = (new moment.utc(startt, IDA_format)).diff(new moment.utc(test[t_dec], "HH:mm:ss-SSS"), 'milleseconds')/1000
                }
              }
              else{
                // No reference was given
                var x = 0;
              }
            }
            // Creating Shape
            // TODO Refractor and put that in a separate function
            var shape = {}
            var color = dynamicColors()
            shape.opacity = 0.5
            shape.type = "line";
            shape.yref = "paper";
            shape.y0 = -10;
            shape.y1 = 10;
            shape.x0 = x;
            shape.x1 = x;
            shape.line = {
              width: 1,
              color: color
            }
            cursors_color[t] = color
            shapes.push(shape)
        }
        try{
          for(let r of rest){
            if(type === "TO"){
              var p = "H_dec"
            }
            else{
              var p = "H_att"
            }
            var h = parseInt(r.replace("ft", ""))
            if(isNaN(h) === false){
              if(p === "H_dec"){
                var idx = bisect_right(data_res[p].y, h)
              }
              else{
                var copied_array = Array.from(data_res[p].y).reverse();
                var idx = bisect_right(copied_array, h)
                var idx = copied_array.length - 1 - idx
              }
              var x = data_res[p].x[idx]
              // Creating Shape
              if(x instanceof Date){
                x = new moment.utc(x).dayOfYear(day).toISOString();
              }
              var shape = {}
              var color = dynamicColors()
              shape.opacity = 0.5
              shape.type = "line";
              shape.yref = "paper";
              shape.y0 = -10;
              shape.y1 = 10;
              shape.x0 = x;
              shape.x1 = x;
              shape.line = {
                width: 1,
                color: color
              }
              cursors_color[r] = color
              times[r] = x
              shapes.push(shape)
            }
          }
        }
        catch(error){
          console.error(error)
        }
        var traces = []
        if(shift!==undefined){
          var tickformat = undefined
        }
        else{
          var tickformat = "%H:%M:%S-%L"
        }
        var data_layout = {
          title: text,
          shapes: shapes,
          dragmode: "pan",
          xaxis: {
            tickformat: tickformat
          },
          grid: {
            rows: Object.keys(axis_config).length,
            columns: 1
          }
        }
        for(let k of Object.keys(axis_config)){
          for(let p of axis_config[k]){
            try{
              traces.push({
                type: "scattergl",
                mode: "lines+markers",
                x: data_res[p].x,
                y: data_res[p].y,
                name: p,
                xaxis:"x",
                yaxis:`y${k}`
              })
            }
            catch(error){
              console.error(error)
            }
          }
        }
        res.status(200)
        console.log("Data has been correctly send to browser")
        var data = {
          traces: traces,
          layout: data_layout,
          times: times,
          shift: shift,
          height: 100*traces.length,
          summary: data_summary,
          cursors_color: cursors_color
        }
        return res.send(data)
    }
}