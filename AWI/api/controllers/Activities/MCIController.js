/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
const fs = require("fs")
const Papa = require('papaparse');
const moment = require("moment")

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
    var flightData = {}
    if (resLength === 1) {
      var activityfilePath = activityFiles[0]
      var discipline = Activity.MCI.discipline
      var _id = path.parse(activityfilePath).name
      var mr = discipline + _id
      console.log("Starting IDA Services")
      var summary = new MCISummary()
      var IDADataManager = new IDA()
      await IDADataManager.OpenSessionSecured()
      await IDADataManager.OpenMR(mr)
      var times = await IDADataManager.GetMRTimes(mr)
      const internal_format = "HH:mm:ss"
      summary.start_time = times[0].format(internal_format)
      summary.end_time = times[1].format(internal_format)
      const CSV_format = "DDD-HH:mm:ss"
      Object.assign(flightData, sails.helpers.extractInfo(_id))
      flightData.START = times[0].format(CSV_format)
      flightData.END = times[1].format(CSV_format)
      flightData.PHASE = "FULL FLIGHT"
      flightData.YEAR = ""
      summary.aircraft = flightData.AIRCRAFT
      summary.test = flightData.TEST
      var parameters_values = await IDADataManager.FetchParameters(mr, MCIConfig.Initialisation)
      summary.Initialisation = parameters_values
      // FIXME Warning Problem with the session closing, raises a `socket hang up` error
      //await IDADataManager.CloseMR(mr)
      //await IDADataManager.CloseSession()
      var GMTcsv = []
      fs.readFile(activityfilePath, 'utf8', function (err, data) {
        if(err){return res.serverError(`Could not read the following file :${activityfilePath}`)}
        Papa.parse(data, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: function (results) {
            /*For each period in PVOL, read the csv file and verify if the 
            error is in the given period. If it is, add it to an array.*/
            var items = [];
            errorHeader = results.meta["fields"];
            startpvol = times[0]
            endpvol = times[1]

            results.data.forEach(function (item) {
              var startcsv = moment(item["START"], CSV_format);
              var endcsv = moment(item["END"], CSV_format);
              if (startcsv > startpvol && endcsv < endpvol) {
                item.MAX = sails.helpers.numberFormat(item.MAX)
                item.MIN = sails.helpers.numberFormat(item.MIN)
                items.push(item)
              
              }
              else{
                console.log("Something wrong happened")
              }
            })
              GMTcsv.push(items)
              return res.view("pages/Activities/MCI/flight-overview", {
                activity: "MCI",
                summary: summary,
                mr:mr,
                name: 'NAME',
                headers: ["START", "END", "PHASE"],
                CSVerrors: GMTcsv,
                CSVheaders: errorHeader,
                data: [flightData],
              })
            }})
      })
    } else {
      if (resLength === 0) {
        return res.serverError("Actinity not found")
      } else {
        return res.serverError("Several Activities Found")
      }
    }
  },

  search: async function(req, res){
    var param = req.param('PARAMETER')
    var type = req.param('TYPE')


    var fs = require('fs');
    var folderpath = Activity.MCI.AutoValCSVDirectory;
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

            for (var i = 0; i < results.data.length; i++) {
              if (results.data[i]["PARAMETER"] == param && results.data[i]["TYPE"] == type) {
                var flightInfo = {};
                flightInfo["YEAR"] = results.data[i]["YEAR"]
                flightInfo["AIRCRAFT"] = results.data[i]["AIRCRAFT"]
                flightInfo["TEST"] = results.data[i]["TEST"]
                flightInfo["CRITICITY"] = ''
                flights.push(flightInfo)
                break
              }
            }

          }
        });
      });

      if (!flights.length) {
        return res.send("notfound")
      }

      aircraftHeaders = Object.keys(flights[0])
      return res.view("pages/Activities/MCI/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'MCI'
      })


    });

  }

}