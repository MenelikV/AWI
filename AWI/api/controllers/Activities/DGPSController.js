/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    const folderpath = Activity.DGPS.AutoValCSVDirectory;

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
      return res.view("pages/Activities/DGPS/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'DGPS'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var PVOLfileName = 'Output_PVOL-' + req.param('id') + '.csv';
    var PVOLfilePath = Activity.DGPS.PVOLCSVDirectory + PVOLfileName;
    var AutovalCSVDirectory = Activity.DGPS.AutoValCSVDirectory
    var search = AutovalCSVDirectory + "\\" + req.param("id") + '*.csv'
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    if(resLength === 1){
      activityfilePath = activityFiles[0]
      var discipline = Activity.DGPS.discipline
      var mr = discipline + path.parse(activityfilePath).name
    }
    else{
      return res.serverError('Problem while searching the folder')
    }
    var fs = require('fs');

    fs.readFile(PVOLfilePath, 'utf8', function (err, data) {
      if (err) {
        console.log('Could not read the file ', err)
        return res.serverError(err)
      }

      var Papa = require('papaparse');
      var flightHeader;
      var flightData
      var content = data;
      var GMTpvol = [];
      //Array with array of objects (errors) for each period in PVOL
      //If there is no error, its an emtpy array
      var GMTcsv = [];
      var errorHeader;
      var summary = new DGPSSummary()

      Papa.parse(content, {
        header: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: function (results) {
          flightHeader = results.meta["fields"]
          flightData = results.data

          results.data.forEach(function (item) {
            var GMTpvolinfo = {};
            GMTpvolinfo["START"] = item["START"].split("-")[1];
            GMTpvolinfo["END"] = item["END"].split("-")[1];
            GMTpvolinfo["PHASE"] = item["PHASE"]

            GMTpvol.push(GMTpvolinfo);
          })
        }
      })

      fs.readFile(activityfilePath, 'utf8', function (err, data) {
        if (err) {
          console.log('could not retrieve activity data')
          console.log(err)
        }
        var Papa = require('papaparse');

        Papa.parse(data, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: function (results) {
            /*For each period in PVOL, read the csv file and verify if the 
            error is in the given period. If it is, add it to an array.*/
            errorHeader = results.meta["fields"];
            GMTpvol.forEach(function (period) {
              var items = [];
              var startpvol = period["START"]
              var endpvol = period["END"]

              results.data.forEach(function (item) {
                var startcsv = item["START"].split("-")[1];
                var endcsv = item["END"].split("-")[1];
                if (startcsv > startpvol && endcsv < endpvol) {
                  item.MAX = sails.helpers.numberFormat(item.MAX)
                  item.MIN = sails.helpers.numberFormat(item.MIN)
                  items.push(item)
                }
              })
              GMTcsv.push(items)
            })
            return res.view("pages/Activities/DGPS/flight-overview", {
              headers: flightHeader,
              data: flightData,
              name: PVOLfileName,
              CSVerrors: GMTcsv,
              CSVheaders: errorHeader,
              activity: 'DGPS',
              summary: summary,
              mr: mr
            })
          }
        })
      })
    })
  }
}