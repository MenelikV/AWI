/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
const moment = require("moment")
const fs = require("fs")
const Papa = require("papaparse")
const IDADataManager = new IDA()
module.exports = {

  getInfo: async function (req, res) {
    var folderpath = await sails.helpers.getSettings('ANEMO', 'AutoValCSVDirectory');

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
      aircraftHeaders = Object.keys(flights[0])
      return res.view("pages/Activities/ANEMO/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'ANEMO'
      })
    });
  },

  getFlightOverview: async function (req, res) {

    var AutovalCSVDirectory = await sails.helpers.getSettings('ANEMO', 'AutoValCSVDirectory')
    var search = req.param("id") + '*.csv'


    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search, {cwd: AutovalCSVDirectory})
    var resLength = activityFiles.length
    var flightData = {}
    if (resLength === 1) {
      var activityfilePath = path.join(AutovalCSVDirectory, activityFiles[0])
      var discipline = await sails.helpers.getSettings('ANEMO', 'discipline')
      var _id = path.parse(activityfilePath).name
      var mr = discipline + _id
      console.log("Starting IDA Services")
      var summary = new ANEMOSummary()
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
      flightData.PHASE = "FULL FLIGHT"
      flightData.YEAR = ""
      summary.aircraft = flightData.AIRCRAFT
      summary.test = flightData.TEST
      var parameters_values = await IDADataManager.FetchParameters(mr, ANEMOConfig.DATA)
      Object.assign(summary, parameters_values)
      // FIXME Warning Problem with the session closing, raises a `socket hang up` error
      //await IDADataManager.CloseMR(mr)
      //await IDADataManager.CloseSession()
      // Save Filters
      var filters = await Filter.find({
        activity: 'ANEMO'
      });
      var filterType = []
      filters.forEach(function (ANEMOfilter) {
        if (ANEMOfilter["aircraft"] === aircraft && ANEMOfilter["test"] < test) {
          var filterInfo = {};
          filterInfo["type"] = ANEMOfilter["type"];
          filterInfo["parameter"] = ANEMOfilter["parameter"];
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
              if (endcsv >= startpvol && startcsv <= endpvol && startcsv >= startpvol && endcsv <= endpvol) {
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
            return res.view("pages/Activities/ANEMO/flight-overview", {
              activity: "ANEMO",
              summary: summary,
              mr: mr,
              name: 'NAME',
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
        return res.serverError("Activity not found")
      } else {
        return res.serverError("Several Activities Found")
      }
    }
  },
}
