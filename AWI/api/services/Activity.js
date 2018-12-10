/**
 * ActivityController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  getCurrentActivityName: function (req, res) {
    return this._activity
  },

  getCurrentAutovalCSVDirectory: function (req, res) {
    return this.activites[this._activity].AutoValCSVDirectory
  },

  getCurrentPVOLCSVDirectory: function (req, res) {
    return this.activites[this._activity].PVOLCSVDirecoty
  },

  changeActivity: function (req, res) {
    switch (req.body["activity"]) {
      case "MCI":
        this._activity = "MCI"
        break
      case "DGPS":
        this._activity = "DGPS"
        break
      default:
        this._activity = "DGPS"
        res.status(200)
    }
  },

  getAllActivitiesName: function (req, res) {
    return Object.entries(this.activites)

  },

  getAllActivities: function (req, res) {
    return this.activites
  },
  _activity : "DGPS",

  activites: {
    "MCI": {
      "longName": "Weight and Balance",
      "AutoValCSVDirectory": "",
      "PVOLCSVDirecoty": ""
    },
    "DGPS": {
      "longName": "Trajectography",
      "AutoValCSVDirectory": "../../assets/test_files/csv/",
      "PVOLCSVDirecoty": "../../assets/test_files/pvol/"
    }
  }
}