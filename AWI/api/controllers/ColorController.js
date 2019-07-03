module.exports = {
    getColors: async function(req, res){
        var activity = req.params.id
        return res.view("pages/Settings/color-settings.ejs",{
            info: {},
            activity: activity,
        })
    },
    addColor: async function(req, res){
        console.log(req)
        req.file("file").upload({}, async function(err, upload){
            if(upload === undefined || err){
                return res.serverError("Upload did not work")
            }
            console.log(upload)
            // TODO Read and parse content, take examples from Audrey Files !
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