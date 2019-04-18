/**
 * SettingsController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * @description :: Updates a specific directory field in the Activity model.
   */
  changeSettings: async function (req, res) {
    var activityName = req.body["activityName"]
    var setting = req.body["setting"]
    var directory = req.body["directory"]
    var slash = _.get(directory.match(/\//gm), "length", 0) > 0
    if (slash) {
      var trailling = "/"
    } else {
      var trailling = "\\"
    }!directory.endsWith(trailling) ? directory += trailling : "";

    switch (setting) {
      case 'AutoValCSVDirectory':
        sails.helpers.checkDirectory(directory).then(async function () {
          await ActivityModel.update({
            activityName: activityName
          }).set({
            AutoValCSVDirectory: directory
          })
          return res.status(200).send()
        }).catch(function () {
          return res.status(500).send()
        })
        break

      case 'PVOLCSVDirectory':
        sails.helpers.checkDirectory(directory).then(async function () {
          await ActivityModel.update({
            activityName: activityName
          }).set({
            PVOLCSVDirectory: directory
          })
          return res.status(200).send()
        }).catch(function () {
          return res.status(500).send()
        })
        break

      case 'SummaryINFODirectory':
        sails.helpers.checkDirectory(directory).then(async function () {
          await ActivityModel.update({
            activityName: activityName
          }).set({
            SummaryINFODirectory: directory
          })
          return res.status(200).send()
        }).catch(function () {
          return res.status(500).send()
        })
        break


      case 'discipline':
        await ActivityModel.update({
          activityName: activityName
        }).set({
          discipline: directory
        })
        return res.status(200).send()
    }
  },

  /**
   * @description :: Retrieves all the info from a specific Activity model.
   */
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
