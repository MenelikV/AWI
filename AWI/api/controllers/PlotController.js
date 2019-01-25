const moment = require("moment")
const internal_format = "DDD-HH:mm:ss-SSS"
const IDA_format = "DDD-HH:mm:ss.SSS"
const IDADataManager = new IDA()
module.exports = {
  plot: async function (req, res) {
    var data = req.query.row
    var max = data.MAX
    var min = data.MIN
    var par = data.PARAMETER.split("/")
    var mr = data.MR
    var type = data.TYPE.replace(/ /g, '_')
    var start = new moment(data.START, internal_format).add({hours: 1})
    var startt = new moment(data.START, internal_format).add({seconds: -30}).format(IDA_format)
    var end = new moment(data.END, internal_format).add({hours: 1})
    var endt = new moment(data.END, internal_format).add({seconds: 30}).format(IDA_format)
    await IDADataManager.OpenSessionSecured()
    await IDADataManager.OpenMR(mr)
    var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
    // FIXME: Is this a normal behavior ?
    //await IDADataManager.CloseMR(mr)
    //await IDADataManager.CloseSession()
    var annotations = Annotations.generate(type, [min, max], [start, end])
    var text = `${data.PARAMETER}, from ${startt} to ${endt}`
    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    var datasets = []
    for(let p of par){
      var color = dynamicColors()
      datasets.push({
          label: p,
          data: data_res.p,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 0.5,
        })
    }
    var config = {
        type: 'line',
        data: {
          datasets: datasets
        },
        options: {
          annotation: {
            events: ["click"],
            annotations: annotations
          },
          title: {
            display: true,
            text: text
          },
          scales: {
            xAxes: [{
              type: "time",
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
    res.status(200)
    res.send(config)
  }
}