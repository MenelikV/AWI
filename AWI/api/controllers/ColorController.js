const fs = require("fs")
module.exports = {
    getColors: async function(req, res){
        var activity = req.params.id
        info = await Color.find({activity: activity}).populate("parameters")
        headers = ["color", "filename", "aircraft"]
        return res.view("pages/Settings/color-settings.ejs",{
            info: info,
            headers: headers,
            activity: activity,
        })
    },
    addColor: async function(req, res){
        req.file("file").upload({}, async function(err, upload){
            if(upload === undefined || err){
                return res.serverError("Upload did not work")
            }
            var color = req.param("color")
            var msn = req.param("msn")
            var activity = req.param("activity")
            console.log(activity)
            let color_entry = await Color.findOrCreate({
                color: color,
                aircraft: msn,
                activity: activity,
                filename: upload[0].filename
            }, {
                color: color,
                aircraft: msn,
                activity: activity,
                filename: upload[0].filename
            });
            fs.readFile(upload[0].fd, async function(err, data){
                if(err){
                    return res.serverError(err)
                }
                var content = data.toString("utf-8")
                lines = content.split("\n")
                lines.shift()
                lines.forEach(async element => {
                    data = element.split("\t")
                    // For Each Lines, create a Parameter Model Entry
                    if(data.length === 2){
                        await Parameter.findOrCreate({
                            source: color_entry.id,
                            name: data[0],
                            mr_id: data[1]
                        }, {
                            source: color_entry.id,
                            name: data[0],
                            mr_id: data[1]
                        })
                    }
                });
            })
        })
        res.status(200)
        return res.send()
    },
    deleteColor: async function(req, res){
        console.log(req)
        res.status(200)
        return res.send()
    }
}