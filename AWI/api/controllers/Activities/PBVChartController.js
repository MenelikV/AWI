const IDA_format = "HH:mm:ss.SSS"
const IDADataManager = new IDA()
module.exports = {
    plot: async function(req, res){
        console.log(req)
        var mr = req.query["mr"]
        var test = req.query["test"]
        var charttype = req.query["type"].trim()
        var testtype = test.type
        // TODO Use test for creating the annotations
        console.log(test)
        var matches = mr.match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
        }
        var config = PBVChartConfig
        var par = Object.values(config[testtype][charttype].pars[aircraft])
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var times = await IDADataManager.GetMRTimes(mr)
        var startt = times[0].format(IDA_format)
        var endt = times[1].format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
        var text = `${par.join("/")}, from ${startt} to ${endt}`
        // TODO Create Annotations
        var data = {
            data_res: data_res,
            text: text,
            annotations: [],
            par: par,
        }
        res.status(200)
        console.log("Data has been correctly send to browser")
        return res.send(data)
    }
}