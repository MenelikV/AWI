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
        var test_type = /([A-Z]\d{4,5}){2}([A-Z]*)/gm.exec(mr)
        if(test_type.length === 3){
          var suffix = test_type[2]
          if(suffix.includes("RTO") || suffix.includes("BRK")){
            var type = "RTO"
          }
          else if(suffix.includes("TO")){
            var type = "TO"
          }
          else if(suffix.includes('LDG'))
          {
            var type = "LDG"
          }
          else{
            return res.serverError("Type could not be determined")
          }
        }
        var config = PBVChartConfig
        var cursors_config = PBVCursorConfig
        var keys = _.pick(cursors_config[testtype], config[testtype][charttype].cursors)
        var times = _.pick(test, Object.values(keys))
        var par = Object.values(config[testtype][charttype].pars[aircraft])
        var mnemo = Object.keys(config[testtype][charttype].pars[aircraft])
        var inverse_map = par.reduce((o, k, i) => ({...o, [k]: mnemo[i]}), {})
        var axis_config = config[testtype][charttype].axis[aircraft]
        var shift = config[testtype][charttype].shift
        if(shift !==undefined){
          par.push(shift)
        }
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var start = moment(test.TDEB, atole_format)
        var end = moment(test.TFIN, atole_format)
        var day = start.dayOfYear()
        var startt = start.format(IDA_format)
        var endt = end.format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par, 8)
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
        //var annotations = Annotations.generate()
        var shapes = [];
        var dynamicColors = function () {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgba(" + r + "," + g + "," + b + "," + "1" + ")";
        }
        // TODO If shift is not undefined, this behavior is incorrect
        var cursors_color = {}
          for(let t of Object.keys(times)){
            if(shift===undefined){
              if(times[t]!=="99.99.99.999"){
                // Day has to be set (otherwise we have a shifting)
                var x = new moment.utc(times[t], "HH:mm:ss.SSS").dayOfYear(day).toISOString()
              }
              else{
                var x = new moment.utc(startt, IDA_format).dayOfYear(day).toISOString()
              }
            }
            else{
              var t_dec = PBVCursorConfig[testtype][shift]
              if(times[t_dec]!="99.99.99.99"){
                if(times[t]!=="99.99.99.999"){
                  // Day has to be set (otherwise we have a shifting)
                  var x = (new moment.utc(times[t], "HH:mm:ss.SSS")).diff(new moment.utc(test[t_dec], "HH:mm:ss.SSS"), 'seconds')
                }
                else{
                  var x = (new moment.utc(startt, IDA_format)).diff(new moment.utc(test[t_dec], "HH:mm:ss.SSS"), 'seconds')
                }
              }
              else{
                // No reference was given
                var x = 0;
              }
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
            cursors_color[t] = color
            shapes.push(shape)
        }
        var traces = []
        if(shift!==undefined){
          var tickformat = undefined
        }
        else{
          var tickformat = "%H:%M:%S"
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
            traces.push({
              type: "scatter",
              mode: "lines+markers",
              x: data_res[p].x,
              y: data_res[p].y,
              name: p,
              xaxis:"x",
              yaxis:`y${k}`
            })
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