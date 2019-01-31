/**
 * SettingsController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  changeSettings: async function (req, res) {
    var activityName = req.body["activityName"]
    var setting = req.body["setting"]
    var directory = req.body["directory"]

    switch (setting) {
      case 'AutoValCSVDirectory':
        await ActivityModel.update({
          activityName: activityName
        }).set({
          AutoValCSVDirectory: directory
        })
        res.status(200)
        return res.send()

      case 'PVOLCSVDirectory':
        await ActivityModel.update({
          activityName: activityName
        }).set({
          PVOLCSVDirectory: directory
        })
        res.status(200)
        return res.send()
      
      case 'discipline':
      await ActivityModel.update({
        activityName: activityName
      }).set({
        discipline: directory
      })
      res.status(200)
      return res.send()
    }
  },

  getSettings: async function (req, res) {
    var activityName = req.param('id')
    var settings = await ActivityModel.find({
      activityName: activityName
    })
    return res.view('pages/Settings/activity-settings', {
        activity: activityName,
        activitySettings: settings[0]
      }) 
  }
}
