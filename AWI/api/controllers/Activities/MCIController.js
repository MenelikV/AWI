/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    const folderpath = Activity.MCI.AutoValCSVDirectory;

    fs.readdir(folderpath, function (err, files) {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      var Papa = require('papaparse');
      var path = require('path');
      var flights = [];
      var aircraftHeaders = [];

      //listing all files
      files.forEach(function (file) {
        var filePath = path.join(folderpath, file)
        var content = fs.readFileSync(filePath, "utf8");
        //parsing file content
        Papa.parse(content, {
          worker: true,
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: function (results) {
            var flightInfo = {};
            flightInfo["YEAR"] = results.data[0]["YEAR"]
            flightInfo["AIRCRAFT"] = results.data[0]["AIRCRAFT"]
            flightInfo["TEST"] = results.data[0]["TEST"]
            flightInfo["CRITICITY"] = ''
            flights.push(flightInfo)
          }
        });
      });
      if (flights.length) {
        aircraftHeaders = Object.keys(flights[0])
      } else {
        return res.serverError("No Flights Found")
      }
      return res.view("pages/Activities/MCI/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'MCI'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var AutovalCSVDirectory = Activity.MCI.AutoValCSVDirectory;
    var search = AutovalCSVDirectory + "\\" + req.param("id") + '*.csv'
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    if (resLength === 1) {
      var filepath = activityFiles[0]
      var filename = filepath.replace(/^.*[\\\/]/, '')
      var discipline = Activity.MCI.discipline
      var mr = discipline + filename.split('.').shift()
      console.log("Starting IDA Services")
      var summary = new MCISummary()
      var IDADataManager = new IDA()
      await IDADataManager.OpenSessionSecured()
      await IDADataManager.OpenMR(mr)
      var times = await IDADataManager.GetMRTimes(mr)
      summary.start_gmt = times[0]
      summary.end_gmt = times[1]
      var parameters_values = await IDADataManager.FetchParameters(mr, MCIConfig)
      Object.assign(summary, parameters_values)
      // FIXME Warning Problem with the session closing, raises a `socket hang up`error
      //await IDADataManager.CloseMR(mr)
      //await IDADataManager.CloseSession()
      // Fetch Data from Server 
      return res.view("pages/Activities/MCI/flight-overview", {
        activity: "MCI",
        summary: summary
      })
    } else {
      if (resLength === 0) {
        return res.serverError("Actinity not found")
      } else {
        return res.serverError("Several Activities Found")
      }
    }
  }

}