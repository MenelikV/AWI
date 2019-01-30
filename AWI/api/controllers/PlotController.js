const moment = require("moment")
const internal_format = "DDD-HH:mm:ss-SSS"
const IDA_format = "HH:mm:ss.SSS"
const IDADataManager = new IDA()
module.exports = {
  plot: async function (req, res) {
    var data = req.query.row
    var max = data.MAX
    var min = data.MIN
    var par = data.PARAMETER.split("/")
    var mr = data.MR
    var type = data.TYPE.replace(/ /g, '_')
    var start = new moment(data.START, internal_format)
    var startt = new moment(data.START, internal_format).add({seconds: -30}).format(IDA_format)
    var end = new moment(data.END, internal_format)
    var endt = new moment(data.END, internal_format).add({seconds: 30}).format(IDA_format)
    await IDADataManager.OpenSessionSecured()
    await IDADataManager.OpenMR(mr)
    var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
    // FIXME: Is this a normal behavior ?
    //await IDADataManager.CloseMR(mr)
    //await IDADataManager.CloseSession()
    var annotations = Annotations.generate(type, [min, max], [start, end])
    var text = `${data.PARAMETER}, from ${startt} to ${endt}`
    var data = {
      text: text,
      annotations: annotations,
      data_res: data_res,
      par: par
    }

    res.status(200)
    res.send(data)
  }
}