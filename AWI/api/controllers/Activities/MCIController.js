/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
const fs = require("fs")
const Papa = require('papaparse');
const moment = require("moment")
const IDADataManager = new IDA();
module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    const folderpath = await sails.helpers.getSettings('MCI', 'AutoValCSVDirectory');

    fs.readdir(folderpath, function (err, files) {
      //handling error
      if (err) {
        console.error('Unable to scan directory: ' + err);
        return res.serverError('Unable to scan directory: ' + err)
      }
      var Papa = require('papaparse');
      var path = require('path');
      var flights = [];
      var aircraftHeaders = [];
      var _error = []

      //listing all files
      files.forEach(function (file) {
        try{
        var filePath = path.join(folderpath, file)
        var creationDate = moment(fs.statSync(filePath).birthtime).format("DD/MM/YYYY HH:mm")
        var content = fs.readFileSync(filePath, "utf8");
        var name = path.parse(file).name
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
            flightInfo["MR"] = name
            flightInfo["CRITICITY"] = ''
            flightInfo["CREATION DATE"] = creationDate
            flights.push(flightInfo)
          }
        })}
        catch(error){
          _error.push(error)
        }
      });
      if(_error.length){
        return res.serverError("Problem occured while reading the files")
      }
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

    var AutovalCSVDirectory = await sails.helpers.getSettings('MCI', 'AutoValCSVDirectory');
    var search = req.param("id") + '*.csv'
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search, {cwd: AutovalCSVDirectory})
    var resLength = activityFiles.length
    var flightData = {}
    if (resLength === 1) {
      var activityfilePath = path.join(AutovalCSVDirectory, activityFiles[0])
      var discipline = await sails.helpers.getSettings('MCI', 'discipline')
      var _id = path.parse(activityfilePath).name
      var mr = discipline + _id
      // TODO Clean redudant code
      var msn = _id.match(/[A-Z]\d{4,}/)[0]
      var matches = req.param("id").match(/[A-Z]\d{4,5}/gm)
      if (matches.length === 2) {
        var aircraft = matches[0]
        var test = matches[1]
      }
      var TEST = req.param("id").match(/([A-Z]\d{4,5}){2}/gm)
      if (TEST.length != 1) {
        return res.serverError("Internal problem while finding the PVOL File name")
      } else {
        var matches = req.param("id").match(/[A-Z]\d{4,5}/gm)
        if (matches.length === 2) {
          var aircraft = matches[0]
          var test = matches[1]
        }
        var info = TEST[0]
      }
      // ODOT
      console.log("Starting IDA Services")
      var summary = new MCISummary()
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
      var day_number = parseInt(times[0].format("DDD"))
      flightData.DATE = new moment(new Date()).startOf("year").add({days: day_number}).format("DD/MM/YYYY")
      console.log(flightData.DATE)
      flightData.PHASE = "FULL FLIGHT"
      flightData.YEAR = ""
      summary.aircraft = flightData.AIRCRAFT
      summary.test = flightData.TEST
      summary.date = flightData.DATE
      var parameters_values = await IDADataManager.FetchParameters(mr, MCIConfig.Initialisation)
      summary.Initialisation = parameters_values
      var start_values = await IDADataManager.FetchParameters(mr, MCIConfig.S, msn)
      var end_values = await IDADataManager.FetchParameters(mr, MCIConfig.E, msn)
      summary.S = start_values
      summary.E = end_values
      // FIXME Warning Problem with the session closing, raises a `socket hang up` error
      //await IDADataManager.CloseMR(mr)
      //await IDADataManager.CloseSession()
      // Save Filters
      var filters = await Filter.find({
        activity: 'MCI'
      });
      var filterType = []
      filters.forEach(function (MCIfilter) {
        if (MCIfilter["aircraft"] === aircraft && MCIfilter["test"] < test) {
          var filterInfo = {};
          filterInfo["type"] = MCIfilter["type"];
          filterInfo["parameter"] = MCIfilter["parameter"];
          filterInfo["raiseError"] = true;
          filterType.push(filterInfo)
        } 
      })
      var GMTcsv = []
      fs.readFile(activityfilePath, 'utf8', function (err, data) {
        if (err) {
          return res.serverError(`Could not read the following file :${activityfilePath}`)
        }
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

              } else {
                console.log("Something wrong happened")
              }
              if (filterType.length) {
                filterType.forEach(function (filter) {
                  if (item["TYPE"] === filter["type"] && item['PARAMETER'] === filter["parameter"]) {
                    items.pop();
                    filter["raiseError"] = false;
                  }
                })
              }
            })
            GMTcsv.push(items)
            return res.view("pages/Activities/MCI/flight-overview", {
              activity: "MCI",
              summary: summary,
              mr: mr,
              name: info,
              headers: ["START", "END", "PHASE"],
              CSVerrors: GMTcsv,
              CSVheaders: errorHeader,
              data: [flightData],
              filterType: filterType,
            })
          }
        })
      })
    } else {
      if (resLength === 0) {
        return res.serverError("Actinity not found")
      } else {
        return res.serverError("Several Activities Found")
      }
    }
  },
}
