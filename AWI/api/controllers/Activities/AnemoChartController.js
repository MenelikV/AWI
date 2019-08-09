const IDA_format = "HH:mm:ss.SSS"
const internal_format = "DDD-HH:mm:ss-SSS"
const IDADataManager = new IDA()
const moment = require("moment")
module.exports = {
    plot: async function(req, res){
        var mr = req.query["mr"]
        console.log(mr)
        var matches = mr.match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
        }
        var config = AnemoChartConfig.Config
        var par = []
        var plotted_par = []
        var min = {}
        var max = {}
        var mnemo = {}
        for(var i=0; i<Object.keys(config).length;i++){
            let k = Object.keys(config)[i]
            let p =  config[k].id
            let mi = config[k].min
            let ma = config[k].max
            switch(p.constructor){
                case String:
                    par.push(p)
                    plotted_par.push(p)
                    min[p] = mi
                    max[p] = ma
                    break
                case Array:
                    par = par.concat(p)
                    break
                case Object:
                    var temp = p[aircraft] ? p[aircraft]: "ZRA1_S"
                    par.push(temp)
                    plotted_par.push(temp)
                    mnemo[temp] = k
                    break
                default:
                    // Do nothing
            }

        } 
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var times = await IDADataManager.GetMRTimes(mr)
        var startt = times[0].format(IDA_format)
        var endt = times[1].format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par, true)
        // TODO Move It to a service ? 
        // Will other Activities benefit from such a feature ?
        for(var i=0; i<Object.keys(config).length;i++){
            let k = Object.keys(config)[i]
            if(config[k].formula !== undefined){
                // Habemus Formula !
                var data = _.pick(data_res, config[k].id)
                l = data[config[k].id[0]].x.length
                var array = Array.from(Array(l), Object);
                for(var i = 0; i<l; i++){
                for(let k of Object.keys(data)){
                    array[i][k] = data[k].y[i]
                }
                }
                var f = new Function('d', config[k].formula.expr)
                var final_data = {}
                final_data.y = array.map(f)
                final_data.x = data[Object.keys(data)[0]].x
                data_res[k] = final_data
            }
        }
        par = Object.keys(config)
        min = _.pick(min, par)
        max = _.pick(max, par)
        for(let k of Object.keys(mnemo)){
            data_res[mnemo[k]] = data_res[k]
        }
        res.status(200)
            // TODO
        obj = {}
        traces = []
        for(let [i, p] of par.slice(0, 4).entries()){
          try{
            var trace = {
              x: data_res[p].x,
              y: data_res[p].y,
              type: "scatter",
              name: `${p}`,
              xaxis:`x${i+1}`,
              yaxis:`y${i+1}`
              
            }
            traces.push(trace)
          }
          catch(error){
            console.error(error)
          }
        }
        var trace_ps = {
          x: data_res["PSREF"].x,
          y: data_res["PSREF"].y,
          type: "scatter",
          name: "PSREF",
          mode: "lines",
        }
        var trace_zra = {
          x: data_res["ZRA"].x,
          y: data_res["ZRA"].y,
          type: "scatter",
          mode: "lines",
          name: "ZRA",
        }
      var layout = {
        dragmode: "pan",
        xaxis:{
          domain: [0, 0.45],
          anchor: 'y1',
          tickformat: '%H %M'
        },
        yaxis:{
          domain: [0.55, 1],
          anchor: 'x1',
          range: [min["PS0_TYPE_DETECT"], max["PS0_TYPE_DETECT"]]
        },
        xaxis2:{
          domain: [0.55, 1],
          anchor: 'y2',
          tickformat: '%H %M'
        },
        yaxis2:{
          domain: [0.55, 1],
          anchor: 'x2',
          range: [min["TSREF0"], max["TSREF0"]]
        },
        xaxis3:{
            domain: [0.55, 1],
            anchor: 'y3',
            tickformat: '%H %M'
          },
        yaxis3:{
          domain: [0, 0.45],
          anchor: 'x3',
          range: [min["ZG0"], max["ZG0"]]
        },
        xaxis4:{
          domain: [0, 0.45],
          anchor: 'y4',
          tickformat: '%H %M'
        },
        yaxis4:{
          domain: [0, 0.45],
          anchor: 'x4'
        }
      };
        console.log("Data has been correctly send to browser")
        return res.send({
          group: {
            traces: traces,
            layout: layout
          },
          zra: {
            trace: [trace_zra],
            layout: {
              title: `ZRA from ${startt} to ${endt}`,
              dragmode: "pan",
              xaxis:{
                tickformat: '%H %M'
              }
            }
          },
          ps: {
            trace: [trace_ps],
            layout: {
              title: `PSREF from ${startt} to ${endt}`,
              dragmode: "pan",
              xaxis: {
                tickformat: '%H %M'
              }
            }
          }
        })
    },

    plotcas: async function(req, res){
        var mr = req.query.row.MR
        var data = req.query.row
        var matches = mr.match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
        }
        var config = AnemoCasChart.Config
        var par = []
        var mnemo = {}
        for(let k of Object.keys(config)){
            p = config[k].id[aircraft] ? config[k].id[aircraft] : config[k].id["U1824"]
            par.push(p)
            mnemo[k] = p
        }
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var startt = new moment(data.START, internal_format).format(IDA_format)
        var endt = new moment(data.END, internal_format).format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
        var dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
          }
          plot_config = {}
          for(let p of Object.keys(config)){
              color = dynamicColors()
              text = `${p} from ${startt} to ${endt}`
            var plot_base_config = {
                type: 'line',
                data: {
                  datasets:[{
                    label: p,
                    data: data_res[mnemo[p]],
                    fill: false,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                    responsive: false,
                    height: 500,
                    width: 700,
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: text
                  },
                  scales: {
                    xAxes: [{
                      type: "time",
                      time: {
                        displayFormats: {
                          second: "HH:mm:ss"
                        },
                        timeFormat: 'YYYYY-MM-DD[T]HH:mm:ss.SSS',
                        tooltipFormat: "HH:mm:ss.SSS"
                      }
                    }]
                  },
                  // Container for pan options
                  pan: {
                    // Boolean to enable panning
                    enabled: true,
          
                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                  },
          
                  // Container for zoom options
                  zoom: {
                    // Boolean to enable zooming
                    enabled: true,
                    drag: false,
          
                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                  }
                }
              }
              plot_config[p] = plot_base_config
          }
          
          res.status(200)

          return res.send(plot_config)
        }

}