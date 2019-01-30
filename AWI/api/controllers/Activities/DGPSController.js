/**
 * DGPSController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require("path")
const moment = require("moment")
const IDADataManager = new IDA()

module.exports = {

  getInfo: async function (req, res) {
    var fs = require('fs');
    var folderpath = await sails.helpers.getSettings('DGPS','AutoValCSVDirectory')


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

  getSettings: async function (req, res) {
    var csv = Activity.DGPS.AutoValCSVDirectory;
    var pvol = Activity.DGPS.PVOLCSVDirectory;

    return res.view('pages/Settings/activity-settings', {
      activity: 'DGPS',
      csv: csv,
      pvol: pvol
    })
  },

  changeDirectory: async function (req, res) {
    var directory = req.body["directory"]
    var fs = require('fs')
    //Check if directory exists
    fs.readdir(directory, function (err, files) {
      if (err) {
        res.status(404)
        return res.send()
      }
      files.forEach(function (file) {
        if (file.includes(!".csv"))
          return res.send(500)
      })

      switch (req.body["file"]) {
        case 'CSV':
          Activity.DGPS.AutoValCSVDirectory = directory
          res.status(200)
          return res.send()

        case 'PVOL':
          Activity.DGPS.PVOLCSVDirectory = directory
          res.status(200)
          return res.send()
      }
    })
  },

  getFlightOverview: async function (req, res) {
    var filterType = [];
    var TEST = req.param("id").match(/([A-Z]\d{4,5}){2}/gm)
    var internal_format = "HH:mm:ss-ms"
    var times = []
    if(TEST.length != 1){
      return res.serverError("Internal problem while finding the PVOL File name")
    }
    else{
      var matches = req.param("id").match(/[A-Z]\d{4,5}/gm)
      if(matches.length === 2){
        var aircraft = matches[0]
        var test = matches[1]
      }
      var info = TEST[0]
    }
    var name = req.param('id')
    var PVOLfileName = 'Output_PVOL-' + info + '.csv';
    var PVOLfilePath = await sails.helpers.getSettings('DGPS','PVOLCSVDirectory') + PVOLfileName;
    var AutovalCSVDirectory = await sails.helpers.getSettings('DGPS','AutoValCSVDirectory')
    var InfoCSVDirectory = await sails.helpers.getSettings("DGPS", "InfoCSVDirectory")
    var search = AutovalCSVDirectory + name + '*.csv'
    var glob = require("glob-fs")()
    var activityFiles = glob.readdirSync(search)
    var resLength = activityFiles.length
    if (resLength === 1) {
      activityfilePath = activityFiles[0] 
      var discipline = await sails.helpers.getSettings('DGPS','discipline')
      var mr = discipline + path.parse(activityfilePath).name
    } else {
      return res.serverError('Problem while searching the folder')
    } 
    var fs = require('fs');
    var glob = require("glob-fs")()
    var info_search = InfoCSVDirectory + req.param("id") + "*.csv"
    var infoFiles = glob.readdirSync(info_search)
    var startvol,
    endvol;
    if(infoFiles.length === 1){
      var summary = sails.helpers.dgpsParser(infoFiles[0])
      var summary_internal_format = "DDD-HH:mm:ss"
      times = [moment(_.get(summary, 'GMT_Deb', undefined), summary_internal_format),
      moment(_.get(summary, 'GMT_Fin', undefined), summary_internal_format)]
      startvol = times[0].format(internal_format)
      endvol = times[1].format(internal_format)
    }
    else{
      console.debug(`No info found for ${info}`)
      startvol = undefined
      endvol = undefined
    }
    try{
      if(startvol === undefined || endvol === undefined){
      await IDADataManager.OpenSessionSecured()
      await IDADataManager.OpenMR(mr)
      var times = await IDADataManager.GetMRTimes(mr)
      var startvol = times[0].format(internal_format)
      var endvol = times[1].format(internal_format)
    }}
      catch(error){
        var startvol = undefined
        var endvol = undefined
      }
      var _id = path.parse(activityfilePath).name
      const CSV_format = "DDD-HH:mm:ss"
      var FullFlightData = {};
      Object.assign(FullFlightData, sails.helpers.extractInfo(_id))
      if(times.length == 2){
        FullFlightData.START = times[0].format(CSV_format)
        FullFlightData.END = times[1].format(CSV_format)
      }
      FullFlightData.PHASE = "FULL FLIGHT"
      FullFlightData.YEAR = ""
    //Save filters
    var filters = await Filter.find({
      activity: 'DGPS'
    });
    filters.forEach(function (DGPSfilter) {
      if (DGPSfilter["aircraft"] === aircraft && DGPSfilter["test"] < test) {
        var filterInfo = {};
        filterInfo["type"] = DGPSfilter["type"];
        filterInfo["raiseError"] = true;
        filterType.push(filterInfo)
      }
    })

    fs.readFile(PVOLfilePath, 'utf8', function (err, data) {
      if (err) {
        return res.serverError('Could not read the file')
      }

      var Papa = require('papaparse');
      var flightHeader;
      var flightData
      var content = data;
      var GMTpvol = [];
      //Array with array of objects (errors) for each period in PVOL
      //If there is no error, its an emtpy array
      var GMTcsv = [];
      var FullGMTcsv = []
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
          res.serverError('could not retrieve activity data')
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
            // Full Flight Analyse
            var Fullitems = []
            results.data.forEach(function (item) {
              var startcsv = item["START"].split("-")[1];
              var endcsv = item["END"].split("-")[1];
              if(startvol !== undefined && endvol !== undefined){
                if(startcsv > startvol && endcsv < endvol){
                  item.MAX = sails.helpers.numberFormat(item.MAX)
                  item.MIN = sails.helpers.numberFormat(item.MIN)
                  Fullitems.push(item)
                }
              }
            })
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
                if (filterType.length) {
                  filterType.forEach(function (filter) {
                    if (item["TYPE"] === filter["type"]) {
                      items.pop();
                      filter["raiseError"] = false;
                    }
                  })
                }
              })
              GMTcsv.push(items)
              FullGMTcsv.push(Fullitems)
            })

            return res.view("pages/Activities/DGPS/flight-overview", {
              headers: flightHeader,
              data: {phases: flightData, full: [FullFlightData]},
              name: PVOLfileName,
              CSVerrors: {phases: GMTcsv, full: FullGMTcsv},
              CSVheaders: errorHeader,
              activity: 'DGPS',
              summary: summary,
              mr: mr,
              filterType: filterType
            })
          }
        })
      })
    })
  },

  search: async function (req, res) {
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var testnum = test.replace(/[^0-9]/g, '')
    var search = "";
    var aircraftHeaders = [];
    var flights = [];
    var files;
    var fs = require('fs');
    var glob = require("glob-fs")()
    for (let x = 0; x < entries; x++) {
      testnum -= 1;
      search = await sails.helpers.getSettings('DGPS','AutoValCSVDirectory') + "\\" + aircraft + '*' + testnum + '*.csv';
      files = glob.readdirSync(search)
    }

    if (files.length) {
      files.forEach(function (file) {
        var folderpath = file;
        var Papa = require('papaparse');
        var cont = 0;
        var index = 0;
        var content = fs.readFileSync(folderpath, "utf8");
        //parsing file content
        Papa.parse(content, {
          worker: true,
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: function (results) {
            for (var i = 0; i < results.data.length; i++) {
              if (type) {
                if (results.data[i]["TYPE"] == type && results.data[i]["PARAMETER"] == param) {
                  cont += 1;
                  index = i;
                } else continue
              } else {
                if (results.data[i]["PARAMETER"] == param) {
                  cont += 1;
                  index = i;
                } else continue
              }
            }
            if (cont > 0) {
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
      })
    }
    if (!flights.length) {
      return res.serverError("nothingfound")
    }
    aircraftHeaders = Object.keys(flights[0])
    return res.view("pages/Activities/DGPS/flights", {
      info: flights,
      headers: aircraftHeaders,
      activity: 'DGPS'
    })
  },


}
