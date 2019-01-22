/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    var folderpath = Activity.Anemo.AutoValCSVDirectory;
 
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
      return res.view("pages/Activities/Anemo/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'Anemo'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var PVOLfileName = 'Output_PVOL-' + req.param('id') + '.csv';
    var PVOLfilePath = Activity.Anemo.PVOLCSVDirectory + PVOLfileName;
    var AutovalCSVDirectory = Activity.Anemo.AutoValCSVDirectory
    var search = AutovalCSVDirectory + "\\" + req.param("id") + '*.csv'

    
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    if (resLength === 1) {
      activityfilePath = activityFiles[0]
      var discipline = Activity.Anemo.discipline
      var mr = discipline + path.parse(activityfilePath).name
    } else {
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
      var summary = new AnemoSummary()

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
            return res.view("pages/Activities/Anemo/flight-overview", {
              headers: flightHeader,
              data: flightData,
              name: PVOLfileName,
              CSVerrors: GMTcsv,
              CSVheaders: errorHeader,
              activity: 'Anemo',
              summary: summary,
              mr: mr
            })
          }
        })
      })
    })
  },

  search: async function (req, res) {
    var aircraft = req.param('aircraft')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var docs = [];
    var fs = require('fs');
    var folderpath = Activity.Anemo.AutoValCSVDirectory;
    fs.readdir(folderpath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      var Papa = require('papaparse');
      var path = require('path');
      var flights = [];
      var aircraftHeaders = [];

      //listing all files
      files.forEach(function (file) {
        file.includes(aircraft) ? docs.push(file) : "";
      });
      docs.sort().reverse()
      for (let l = 0; l < entries; l++) {
        if (docs[l]) {
          var cont = 0;
          var index = 0;
          var filePath = path.join(folderpath, docs[l])
          var content = fs.readFileSync(filePath, "utf8");
          //parsing file content
          Papa.parse(content, {
            worker: true,
            header: true,
            delimiter: ";",
            skipEmptyLines: true,
            complete: function (results) {
              for (let i = 0; i < results.data.length; i++) {
                if (results.data[i]["PARAMETER"] == param && results.data[i]["TYPE"] == type) {
                  cont += 1;
                  index = i;
                }
              }
              if (cont>0) {
                var flightInfo = {};
                flightInfo["YEAR"] = results.data[index]["YEAR"]
                flightInfo["AIRCRAFT"] = results.data[index]["AIRCRAFT"]
                flightInfo["TEST"] = results.data[index]["TEST"]
                flightInfo["ERRORS"] = cont
                flightInfo["CRITICITY"] = ''
                flights.push(flightInfo)
              }
            }
          });
        }
      }
      if (!flights.length) {
        return res.send("nothingfound")
      }
      aircraftHeaders = Object.keys(flights[0])
      return res.view("pages/Activities/Anemo/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'Anemo'
      })
    });
  }
}
