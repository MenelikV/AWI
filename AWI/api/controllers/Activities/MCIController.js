/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    const folderpath = Activity.MCI.AutovalCSVDirectory;

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
      aircraftHeaders = Object.keys(flights[0])
      return res.view("pages/Activities/MCI/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'MCI'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var AutovalCSVDirectory = Activity.MCI.AutovalCSVDirectory;
    var search = AutovalCSVDirectory + "\\" + req.param("id") + '*.csv'
    var glob = require("glob-fs")
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    switch (resLength) {
      case resLength === 1:
        var filepath = activityFiles[0]
        var filename = filepath.replace(/^.*[\\\/]/, '')
        var mr = filename.split('.').pop()
        IDADataManager.OpenMR(mr)
        // Fetch Data from Server 
        return
      case resLength < 1:
        return res.serverError('Activity not found')
      case resLength > 1:
        return res.serverError("Several Activities found")
    }
  }

}