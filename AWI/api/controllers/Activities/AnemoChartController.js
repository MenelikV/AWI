const IDA_format = "HH:mm:ss.SSS"
const IDADataManager = new IDA()
module.exports = {
    plot: async function(req, res){
        // TODO
        console.log(req)
        var mr = req.query["mr"]
        console.log(mr)
        var matches = mr.match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
        }
        var config = AnemoChartConfig.Config
        var par = []
        var min = {}
        var max = {}
        for(var i=0; i<Object.keys(config).length;i++){
            let k = Object.keys(config)[i]
            let p =  config[k].id
            let mi = config[k].min
            let ma = config[k].max
            if(typeof p!=="string"){
                p[aircraft] ? par.push(p[aircraft]) : par.push("ZRA1_S")
            }
            else{
                par.push(p)
            }
            min[p] = mi
            max[p] = ma
        } 
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var times = await IDADataManager.GetMRTimes(mr)
        var startt = times[0].format(IDA_format)
        var endt = times[1].format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
        var text = `${par.join("/")}, from ${startt} to ${endt}`
        var data = {
            data_res: data_res,
            text: text,
            annotations: [],
            par: par,
            max: max,
            min: min
        }
        res.status(200)
        console.log("Data has been correctly send to browser")
        return res.send(data)
    }
}