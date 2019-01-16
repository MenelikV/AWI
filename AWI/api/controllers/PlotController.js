const moment = require("moment")
const internal_format = "DDD-HH:mm:ss-SSS"
const IDA_format = "DDD-HH:mm:ss.SSS"
const plot_format = "HH:mm:ss.SSS"
const IDADataManager = new IDA()
module.exports = {
    plot: async function(req, res){
        var data = req.query.row
        var max = data.MAX
        var min = data.MIN
        var par = data.PARAMETER 
        var mr = data.MR
        var type = data.TYPE.replace(/ /g, '_')
        var startt = moment(data.START, internal_format).add({seconds: -30}).format(IDA_format)
        var endt = moment(data.END, internal_format).add({seconds: 30}).format(IDA_format)
        var start_a = moment(data.START, internal_format).format(plot_format)
        var endt_a = moment(data.END, internal_format).format(plot_format)
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var data_res = await IDADataManager.ReadData(mr, startt, endt, [par])
        // FIXME: Is this a normal behavior ?
        //await IDADataManager.CloseMR(mr)
        //await IDADataManager.CloseSession()
        var values = [min, max]
        var times = [start_a, endt_a]
        var text = `${par}, from ${startt} to ${endt}`
        var dataset = {
            labels: data_res.time,
            datasets: [
                {
                    type: "line",
                    label: `${par}`,
                    borderColor: 'rgba(0,0,256,0.1)',
                    backgroudColor: 'rgba(0,0,256,0.1)',
                    borderWidth: 1,
                    fill: false,
                    data: data_res.value,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }
            ]
        }
        var data_to_send = {
            type: "line",
            data: dataset,
            options: {
                annotation: {
                    events: ["click"],
                            annotations: Annotations.generate(type, values, times)
                  },
                responsive: true,
                title: { 
                    display: true,
                    text: text
                },
                tooltips: {
                    mode: "index",
                    intersect: true,
                },
                scales: {
                    xAxes: [{
                        display: true,
                        /*type: "time",
                        scaleLabel: {
                            display: true,
                            labelString: "Time"
                        },*/
                    }],
                    yAxes: [{
                        display: true,
                        //labelString: 'Value'
                    }]
                },
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy',
                    speed: 10,
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: null,
                        y: null
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: null,
                        y: null
                    },
                    // Function called once panning is completed
                    // Useful for dynamic data loading
                    onPan: function() { console.log('I was panned!!!'); }
                },
                
                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Enable drag-to-zoom behavior
                    drag: false,

                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                    // Useful for dynamic data loading
                    onZoom: function() { console.log('I was zoomed!!!'); }
                }
            },
        }
        res.status(200)
        res.send(data_to_send)
    }
}