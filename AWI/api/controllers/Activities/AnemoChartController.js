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
                case Array:
                    par = par.concat(p)
                case Object:
                    p[aircraft] ? par.push(p[aircraft]) : par.push("ZRA1_S")
                    p[aircraft] ? plotted_par.push(p[aircraft]) : plotted_par.push("ZRA1_S")
                    if(p[aircraft]){
                        mnemo[p[aircraft]] = k
                    }
                default:
                    // Do nothing
            }

        } 
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var times = await IDADataManager.GetMRTimes(mr)
        var startt = times[0].format(IDA_format)
        var endt = times[1].format(IDA_format)
        var data_res = await IDADataManager.ReadPlotData(mr, startt, endt, par)
        // TODO Move It to a service ? 
        // Will other Activities benefit from such a feature ?
        for(var i=0; i<Object.keys(config).length;i++){
            let k = Object.keys(config)[i]
            if(config[k].formula !== undefined){
                // Habemus Formula !
                var data = _.pick(data_res, config[k].id)
                l = data[config[k].id[0]].length
                var array = Array.from(Array(l), Object);
                for(var i = 0; i<l; i++){
                for(let k of Object.keys(data)){
                    array[i].x = data[k][i].x
                    array[i][k] = parseFloat(data[k][i].y)
                }
                }
                var f = new Function('d', config[k].formula.expr)
                var final_data = array.map(f)
                data_res[k] = final_data
            }
        }
        par = Object.keys(config)
        min = _.pick(min, par)
        max = _.pick(max, par)
        for(let k of Object.keys(mnemo)){
            data_res[mnemo[k]] = data_res[k]
        }
        var text = `${par.join(" / ")}, from ${startt} to ${endt}`
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