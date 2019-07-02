module.exports = {
    getColors: async function(req, res){
        var activity = req.params.id
        return res.view("pages/Settings/color-settings.ejs",{
            info: {},
            activity: activity,
        })
    }
}