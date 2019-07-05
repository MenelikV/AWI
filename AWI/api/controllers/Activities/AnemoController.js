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
        var creationDate = moment(fs.statSync(filePath).birthtime).format("DD/MM/YYYY HH:mm")
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
      if (_error.length) {
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

    // TODO Clean Redundant Code
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
    var PVOLfileName = 'Output_PVOL-' + info + '.csv';
    var PVOLfilePath = await sails.helpers.getSettings('ANEMO', 'PVOLCSVDirectory') + PVOLfileName;
    var content;
    try{
      var content = fs.readFileSync(PVOLfilePath, "utf8")
    }
    catch(error){
      console.error(`${PVOLfilePath} was not found or is invalid`)
    }
    var GMTpvol = []
    var phasesFlightData = [];
    var colors = await Color.find({activity: 'ANEMO', aircraft: aircraft}).populate("parameters")
    var par_colors = {}
    colors.forEach(color => {
      color.parameters.forEach(paremeter => {
        par_colors[paremeter] = color.color
      })
    })
    const black = "#000000"
    var handler = {
      get: function(target, name) {
        return target.hasOwnProperty(name) ? target[name] : black;
      }
    };
    
    var color_mapper = new Proxy(par_colors, handler);
    if(content !== undefined){
      Papa.parse(content, {
        // Be sure that the header are uppercase
        beforeFirstChunk: function(chunk) {
          var rows = chunk.split( /\r\n|\r|\n/ );
          var headings = rows[0].toUpperCase();
          rows[0] = headings;
          return rows.join("\r\n");
        },
        header: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: function (results) {
          flightHeader = results.meta["fields"]
          phasesFlightData = results.data
          results.data.forEach(function (item) {
            var GMTpvolinfo = {};
            GMTpvolinfo["START"] = item["START"].split("-")[1];
            GMTpvolinfo["END"] = item["END"].split("-")[1];
            GMTpvolinfo["PHASE"] = item["PHASE"]
            GMTpvol.push(GMTpvolinfo);
          })
        }
      })
      GMTpvol = sails.helpers.phasePatcher(GMTpvol)
      phasesFlightData = sails.helpers.phasePatcher(phasesFlightData)
    }
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search, {
      cwd: AutovalCSVDirectory
    })
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
        if (ANEMOfilter["aircraft"] === flightData.AIRCRAFT && ANEMOfilter["test"] < flightData.TEST) {
          var filterInfo = {};
          filterInfo["type"] = ANEMOfilter["type"];
          filterInfo["parameter"] = ANEMOfilter["parameter"];
          filterInfo["phase"] = ANEMOfilter["phase"];
          filterInfo["raiseError"] = true;
          filterType.push(filterInfo)
        }
      })
      var GMTcsv = []
      var FullGMTcsv = []
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
            var Fullitems = [];
            errorHeader = results.meta["fields"];
            startpvol = times[0]
            endpvol = times[1]
            var FullerrorMap = {}
            // Full Flight Analysis
            results.data.forEach(function (item) {
              var startcsv = moment(item["START"], CSV_format);
              var endcsv = moment(item["END"], CSV_format);
              if (startcsv > startpvol && endcsv < endpvol) {
                item.MAX = sails.helpers.numberFormat(item.MAX)
                item.MIN = sails.helpers.numberFormat(item.MIN)
                item["STYLE"] = color_mapper[item["PARAMETER"]]
                Fullitems.push(item)
                var type = item["TYPE"]
                if(FullerrorMap[type] === undefined){
                  FullerrorMap[type] = 1
                }
                else{
                  FullerrorMap[type]++;
                }

              } else {
                console.log("Something wrong happened")
              }
              if (filterType.length) {
                filterType.forEach(function (filter) {
                  if (item["TYPE"] === filter["type"] && item['PARAMETER'] === filter["parameter"] && item['PHASE'] === filter["phase"]) {
                    Fullitems.pop();
                    FullerrorMap[type]--;
                    filter["raiseError"] = false;
                  }
                })
              }
            })
            FullerrorMap = _.pick(FullerrorMap, (v, k) => {return v > 0;})
            FullGMTcsv.push(Fullitems)
            // Phases Analysis
            var errorMap = []
            GMTpvol.forEach(function (period) {
              var items = [];
              var startpvol = period["START"]
              var endpvol = period["END"]
              var currentMap = {}
              results.data.forEach(function (item) {
                var startcsv = item["START"].split("-")[1];
                var endcsv = item["END"].split("-")[1];
                if (endcsv > startpvol && startcsv < endpvol) {
                  item.MAX = sails.helpers.numberFormat(item.MAX)
                  item.MIN = sails.helpers.numberFormat(item.MIN)
                  item["STYLE"] = color_mapper[item["PARAMETER"]]
                  items.push(item)
                  var type = item["TYPE"]
                  if(currentMap[type] === undefined){
                    currentMap[type] = 1
                  }
                  else{
                    currentMap[type]++;
                  }
  
                }
                if (filterType.length) {
                  filterType.forEach(function (filter) {
                    if (item["TYPE"] === filter["type"] && item['PARAMETER'] === filter["parameter"] && item['PHASE'] === filter["phase"]) {
                      items.pop();
                      currentMap[type]--;
                      filter["raiseError"] = false;
                    }
                  })
                }
              })
              GMTcsv.push(items)
              currentMap = _.pick(currentMap, (v, k) => {return v > 0;})
              errorMap.push(currentMap)
            })
            var filterHeader = filterType.length ? Object.keys(filterType[0]) : []
            var filterTrigger = false;
            filterType.forEach(function (filter) {
              if (filter["raiseError"] === true) {
                filterTrigger = true;
              }
            })
            return res.view("pages/Activities/ANEMO/flight-overview", {
              activity: "ANEMO",
              summary: summary,
              mr: mr,
              name: info,
              headers: ["START", "END", "PHASE"],
              CSVerrors: {
                phases: GMTcsv,
                full: FullGMTcsv
              },
              CSVheaders: errorHeader,
              data: {
                phases: phasesFlightData,
                full: [flightData]
              },
              filterType: filterType,
              filterHeader: filterHeader,
              errorMap: {
                phases: errorMap,
                full: FullerrorMap
              },
              filterTrigger: filterTrigger,
              colorHeader: colors.length? ["color", "filename"]: [],
              colorType: colors
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
