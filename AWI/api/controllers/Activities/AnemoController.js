/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
const moment = require("moment")
const fs = require("fs")
const Papa = require("papaparse")
module.exports = {

  getInfo: async function (req, res) {
    var folderpath = Activity.ANEMO.AutoValCSVDirectory;

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
      return res.view("pages/Activities/ANEMO/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'ANEMO'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var AutovalCSVDirectory = Activity.ANEMO.AutoValCSVDirectory;
    var search = AutovalCSVDirectory + "\\" + req.param("id") + '*.csv'
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    var flightData = {}
    if (resLength === 1) {
      var activityfilePath = activityFiles[0]
      var discipline = Activity.ANEMO.discipline
      var _id = path.parse(activityfilePath).name
      var mr = discipline + _id
      console.log("Starting IDA Services")
      var summary = new ANEMOSummary()
      var IDADataManager = new IDA()
      await IDADataManager.OpenSessionSecured()
      await IDADataManager.OpenMR(mr)
      var times = await IDADataManager.GetMRTimes(mr)
      const internal_format = "HH:mm:ss"
      summary.start_time = times[0].format(internal_format)
      summary.end_time = times[1].format(internal_format)
      summary.mr = mr
      // TO BE Confirmed by Audrey
      summary.test = _id
      const CSV_format = "DDD-HH:mm:ss"
      Object.assign(flightData, sails.helpers.extractInfo(_id))
      flightData.START = times[0].format(CSV_format)
      flightData.END = times[1].format(CSV_format)
      var delta = times[1].unix() - times[0].unix()
      var fetcht = moment.unix(times[0].unix()+delta/2).format("DDD-HH:mm:ss")
      flightData.PHASE = "FULL FLIGHT"
      flightData.YEAR = ""
      summary.aircraft = flightData.AIRCRAFT
      summary.test = flightData.TEST
      var parameters_values = await IDADataManager.FetchTextParameters(mr, fetcht, ANEMOConfig.DATA)
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
              return res.view("pages/Activities/ANEMO/flight-overview", {
                activity: "ANEMO",
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
        return res.serverError("Activity not found")
      } else {
        return res.serverError("Several Activities Found")
      }
    }
},

  search: async function (req, res) {
    var aircraft = req.param('aircraft')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var docs = [];
    var folderpath = Activity.ANEMO.AutoValCSVDirectory;
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
      return res.view("pages/Activities/ANEMO/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'ANEMO'
      })
    });
  }
}
