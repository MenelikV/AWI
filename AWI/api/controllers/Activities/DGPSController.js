/**
 * DGPSController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require("path")
const moment = require("moment")
const IDADataManager = new IDA()

module.exports = {

  /**
   * @description :: Accesses the csv file directory for all flights then reads, parses and saves info of each flight.
   * @var {Array} flights - Contains the info of all flights stored in objects.
   * @var {Object} flightInfo - Object containing info on each flight.
   * @var {Array} aircraftHeaders - Contains the headers to be shown in the table.
   */
  getInfo: async function (req, res) {
    var fs = require('fs');
    var folderpath = await sails.helpers.getSettings('DGPS', 'AutoValCSVDirectory')

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
      var _error = [];

      //listing all files
      files.forEach(function (file) {
        try {
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
          })
        } catch (error) {
          _error.push(error)
        }
      });
      if (_error.length) {
        //return res.serverError("Problem occured while reading the files")
      }
      aircraftHeaders = Object.keys(flights[0])
      return res.view("pages/Activities/DGPS/flights", {
        info: flights,
        headers: aircraftHeaders,
        activity: 'DGPS'
      })
    });
  },

  /**
   * @description :: Accesses CSV and PVOL file directory of the selected flight and stores each of it's CSV errors to it's corresponding PVOL periods, also applies filters to the corresponding errors.
   * @var {Array} filterType - Contains an array of objects with the info of all filters that apply to the selected flight.
   * @var {Object} filterInfo - Contains full info on each filter that applies to the selected flight.
   * @var {Array} GMTpvol - Contains an array of objects with PVOL periods of the corresponding flight.
   * @var {Object} GMTpvolinfo - Contains full info on each PVOL period of the selected flight.
   * @var {Array} GMTcsv - Contains an array with all CSV errors for each PVOL period.
   * @var {Array} items - Contains an array of objects with CSV errors full info corresponding to each PVOL period.
   * @var {Array} FullGMTcsv - Contains an array with all the errors presented during the full flight duration (not periods)
   * @var {Array} Fullitems - Contains all the errors presented during the full flight.
   * @var {Array} errorHeader - Contains the headers for the selected flight overview.
   */
  getFlightOverview: async function (req, res) {
    var filterType = [];
    var TEST = req.param("id").match(/([A-Z]\d{4,5}){2}/gm)
    var internal_format = "HH:mm:ss-ms"
    var times = []
    var summary = new DGPSSummary()
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
    var name = req.param('id')
    var PVOLfileName = 'Output_PVOL-' + info + '.csv';
    var PVOLfilePath = await sails.helpers.getSettings('DGPS', 'PVOLCSVDirectory') + PVOLfileName;
    var AutovalCSVDirectory = await sails.helpers.getSettings('DGPS', 'AutoValCSVDirectory')
    var InfoCSVDirectory = await sails.helpers.getSettings("DGPS", "SummaryINFODirectory")
    var search = name + '*.csv'
    var glob = require("glob-fs")()

    var activityFiles = glob.readdirSync(search, {
      cwd: AutovalCSVDirectory
    })
    var resLength = activityFiles.length
    if (resLength === 1) {
      activityfilePath = path.join(AutovalCSVDirectory, activityFiles[0])
    } else {
      return res.serverError('Problem while searching the folder')
    }

    /**
     * Check for flight summary data
     */
    var fs = require('fs');
    var glob = require("glob-fs")()
    var info_search = req.param("id") + "*.csv"
    var infoFiles = glob.readdirSync(info_search, {
      cwd: InfoCSVDirectory
    })
    var startvol,
      endvol;
    if (infoFiles.length === 1) {
      summary = sails.helpers.dgpsParser(path.join(InfoCSVDirectory, infoFiles[0]))
      summary.test = test
      summary.aircraft = aircraft
      var summary_internal_format = "DDD-HH:mm:ss"
      times = [moment(_.get(summary, 'GMT_Deb', undefined), summary_internal_format),
        moment(_.get(summary, 'GMT_Fin', undefined), summary_internal_format)
      ]
      startvol = times[0].format(internal_format)
      endvol = times[1].format(internal_format)
      var discipline = await sails.helpers.getSettings('DGPS', 'discipline')
      var mr = discipline + path.parse(path.join(InfoCSVDirectory, infoFiles[0])).name
    } else {
      console.debug(`No info found for ${info}`)
      startvol = undefined
      endvol = undefined
    }
    try {
      if ((startvol === undefined || endvol === undefined) && (infoFiles.length === 1)) {
        await IDADataManager.OpenSessionSecured()
        await IDADataManager.OpenMR(mr)
        var times = await IDADataManager.GetMRTimes(mr)
        var startvol = times[0].format(internal_format)
        var endvol = times[1].format(internal_format)
      }
    } catch (error) {
      var startvol = undefined
      var endvol = undefined
    }

    /**
     * Check for full flight data
     */
    var _id = path.parse(activityfilePath).name
    const CSV_format = "DDD-HH:mm:ss"
    var FullFlightData = {};
    Object.assign(FullFlightData, sails.helpers.extractInfo(_id))
    if (times.length == 2) {
      FullFlightData.START = times[0].format(CSV_format)
      FullFlightData.END = times[1].format(CSV_format)
    }
    FullFlightData.PHASE = "FULL FLIGHT"
    FullFlightData.YEAR = ""

    /**
     * Find and save filters for the corresponding flight
     * */
    const numeral = require("numeral")
    var filters = await Filter.find({
      activity: 'DGPS'
    });
    filters.forEach(function (DGPSfilter) {
      if (DGPSfilter["aircraft"] === aircraft && numeral(DGPSfilter["test"]).value() < numeral(test).value()) {
        var filterInfo = {};
        filterInfo["type"] = DGPSfilter["type"];
        filterInfo["parameter"] = DGPSfilter["parameter"];
        filterInfo["phase"] = DGPSfilter["phase"];
        filterInfo["raiseError"] = true;
        filterType.push(filterInfo)
      }
    })

    /**
     * Read the flight's PVOL file and save each period
     */
    fs.readFile(PVOLfilePath, 'utf8', function (err, data) {
      if (err) {
        return res.serverError('Could not read the file')
      }

      var Papa = require('papaparse');
      var flightHeader;
      var flightData;
      var content = data;
      var GMTpvol = [];
      var GMTcsv = [];
      var FullGMTcsv = []
      var errorHeader;
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
      GMTpvol = sails.helpers.phasePatcher(GMTpvol)
      flightData = sails.helpers.phasePatcher(flightData)
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
            /* * 
             * For each period in PVOL, reads the csv file and verifies if each error is in the given period. 
             * If it is, adds it to an array. Also checks and filters specified errors if necessary.
             * */
            errorHeader = results.meta["fields"];
            var Fullitems = []
            results.data.forEach(function (item) {
              var startcsv = item["START"].split("-")[1];
              var endcsv = item["END"].split("-")[1];
              if (startvol !== undefined && endvol !== undefined) {
                if (startcsv > startvol && endcsv < endvol) {
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
                if (endcsv >= startpvol && startcsv <= endpvol && startcsv >= startpvol && endcsv <= endpvol) {
                  item.MAX = sails.helpers.numberFormat(item.MAX)
                  item.MIN = sails.helpers.numberFormat(item.MIN)
                  items.push(item)
                  if (filterType.length) {
                    filterType.forEach(function (filter) {
                      if (item["TYPE"] === filter["type"] && item["PARAMETER"] === filter["parameter"] && item["PHASE"] === filter["phase"]) {
                        items.pop();
                        filter["raiseError"] = false;
                      }
                    })
                  }
                }
              })
              GMTcsv.push(items)
              FullGMTcsv.push(Fullitems)
            })
            var filterTrigger = false;
            filterType.forEach(function (filter) {
              if (filter["raiseError"] === true) {
                filterTrigger = true;
              }
            })
            return res.view("pages/Activities/DGPS/flight-overview", {
              headers: flightHeader,
              data: {
                phases: flightData,
                full: [FullFlightData]
              },
              name: PVOLfileName,
              CSVerrors: {
                phases: GMTcsv,
                full: FullGMTcsv
              },
              CSVheaders: errorHeader,
              activity: 'DGPS',
              summary: summary,
              mr: mr,
              filterType: filterType,
              filterTrigger: filterTrigger,
            })
          }
        })
      })
    })
  },
}
