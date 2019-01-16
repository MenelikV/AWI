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
        var data_to_send = {
            labels: data_res.time,
            values: data_res.value,
            title: text
        }
        res.status(200)
        res.send(data_to_send)
    }
}