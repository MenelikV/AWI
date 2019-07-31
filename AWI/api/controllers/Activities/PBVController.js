/**
 * PBVController
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
      var fs = require('fs');
      const folderpath = await sails.helpers.getSettings('PBV', 'AutoValCSVDirectory');
  
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
            // Support Header wit lowercase as well
            beforeFirstChunk: function(chunk) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                var headings = rows[0].toUpperCase();
                rows[0] = headings;
                return rows.join("\r\n");
            },
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
        if (_error.length) {
            console.error(_error)
          return res.serverError("Problem occured while reading the files")
        }
        if (flights.length) {
          aircraftHeaders = Object.keys(flights[0])
        } else {
          return res.serverError("No Flights Found")
        }
        return res.view("pages/Activities/PBV/flights", {
          info: flights,
          headers: aircraftHeaders,
          activity: 'PBV'
        })
      });
    },

    getFlightOverview: async function (req, res) {

        var AutovalCSVDirectory = await sails.helpers.getSettings('PBV', 'AutoValCSVDirectory');
        var search = req.param("id") + '*.csv'
        var glob = require("glob-fs")()
        var activityFiles = glob.readdirSync(search, {
          cwd: AutovalCSVDirectory
        })
        var resLength = activityFiles.length
        var flightData = {}
        var errorMap = []
        if (resLength === 1) {
          var activityfilePath = path.join(AutovalCSVDirectory, activityFiles[0])
          var discipline = await sails.helpers.getSettings('PBV', 'discipline')
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
          var test_type = /([A-Z]\d{4,5}){2}([A-Z]*)/gm.exec(req.param("id"))
          if(test_type.length === 3){
            var suffix = test_type[2]
            if(suffix.includes("RTO") || suffix.includes("BRK")){
              var type = "RTO"
            }
            else if(suffix.includes("TO")){
              var type = "TO"
            }
            else if(suffix.includes('LDG'))
            {
              var type = "LDG"
            }
            else{
              res.serverError("Type could not be determined")
            }
          }
          else{
            return res.serverError("Type could not be determined")
          }
          // ODOT
          console.log("Starting IDA Services")
          var summary = new PBVSummary()
          await IDADataManager.OpenSessionSecured()
          await IDADataManager.OpenMR(mr)
          var times = await IDADataManager.GetMRTimes(mr)
          const CSV_format = "DDD-HH:mm:ss"
          summary.start_time = times[0].format(CSV_format)
          summary.end_time = times[1].format(CSV_format)
          var day_number = parseInt(times[0].format("DDD"))
          summary.flight_date = new moment(new Date()).startOf("year").add({days: day_number}).format("DD/MM/YYYY")
          summary.mr = mr
          summary.aircraft = aircraft
          summary.test = test
          summary.msn = msn
          summary.prog = ProgramConfig.Config[msn]
          Object.assign(flightData, sails.helpers.extractInfo(_id))
          flightData.START = times[0].format(CSV_format)
          flightData.END = times[1].format(CSV_format)
          flightData.PHASE = "FULL FLIGHT"
          flightData.YEAR = ""
          summary.aircraft = flightData.AIRCRAFT
          summary.test = flightData.TEST
          var parameters_values = await IDADataManager.FetchParametersPBV(mr, PBVConfig.DATA, aircraft.substring(1), type)
          Object.assign(summary, parameters_values)
          var filters = await Filter.find({
            activity: 'PBV'
          });
          var filterType = []
          filters.forEach(function (MCIfilter) {
            if (MCIfilter["aircraft"] === flightData.AIRCRAFT && MCIfilter["test"] < flightData.TEST) {
              var filterInfo = {};
              filterInfo["type"] = MCIfilter["type"];
              filterInfo["parameter"] = MCIfilter["parameter"];
              filterInfo["phase"] = MCIfilter["phase"];
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
                var currentMap = {}
                results.data.forEach(function (item) {
                  var startcsv = moment(item["START"], CSV_format);
                  var endcsv = moment(item["END"], CSV_format);
                  if (startcsv > startpvol && endcsv < endpvol) {
                    item.MAX = sails.helpers.numberFormat(item.MAX)
                    item.MIN = sails.helpers.numberFormat(item.MIN)
                    items.push(item)
                    var type = item["TYPE"]
                    if(currentMap[type] === undefined){
                      currentMap[type] = 1
                    }
                    else{
                      currentMap[type]++;
                    }
                    if (filterType.length) {
                      filterType.forEach(function (filter) {
                        if (item["TYPE"] === filter["type"] && item['PARAMETER'] === filter["parameter"] && item['PHASE'] === filter["phase"]) {
                          items.pop();
                          filter["raiseError"] = false;
                        }
                      })
                    }
                  } else {
                    console.log("Something wrong happened")
                  }
                })
                GMTcsv.push(items)
                currentMap = _.pick(currentMap, (v, k) => {return v > 0;})
                var filterHeader = filterType.length ? Object.keys(filterType[0]) : []
                var filterTrigger = false;
                filterType.forEach(function (filter) {
                  if (filter["raiseError"] === true) {
                    filterTrigger = true;
                  }
                })
                try{
                  var AtoleCSVDirectory = await sails.helpers.getSettings('PBV', 'AtoleCSVDirectory');
                  var pattern = `${req.param("id")}_Exploit_([ATTERISSAGE, RTO, DECOLLAGE])_Temps_et_Vars_\d.csv`
                  var reg = new RegExp(pattern, 'g')
                  var atoleFiles = glob.readdirSync(reg, {
                    cwd: AtoleCSVDirectory
                  })
                  var testData = sails.helpers.extractTests(atoleFiles, AtoleCSVDirectory)
                  if(atoleFiles.length){
                    var chartChoice = PBVChartChoices.Config[testData[atoleFiles[0]].type] ? PBVChartChoices.Config[testData[atoleFiles[0]].type]: []
                  }
                  else{
                    var chartChoice = []
                  }
                }
                catch(err){
                  console.error(err)
                  var testData = {}
                  var atoleFiles = []
                  var chartChoice = []
                }
                return res.view("pages/Activities/PBV/flight-overview", {
                  activity: "PBV",
                  summary: summary,
                  mr: mr,
                  name: info,
                  headers: ["START", "END", "PHASE", "ERRORS"],
                  CSVerrors: GMTcsv,
                  CSVheaders: errorHeader,
                  data: [flightData],
                  filterType: filterType,
                  filterTrigger: filterTrigger,
                  errorMap: currentMap,
                  filterHeader: filterHeader,
                  atoleFiles: atoleFiles,
                  testData: testData,
                  chartChoice: chartChoice
                })
              }
            })
          })
        }
        else{
            if (resLength === 0) {
              return res.serverError("Actinity not found")
            } else {
              return res.serverError("Several Activities Found")
            }
          }
    }
}