module.exports = {

  /**
   * @description :: Searches for previous test flights with matching type and/or parameter values as specified. The amount of flights to search for is based on the entered amount of entries.
   * @var {String} param - Value of the specified parameter to be matched.
   * @var {String} type - Value of the specified type to be matched (optional).
   * @var {Int} entries - Value of the specified amount of previous flights to search for.
   * @var {Array} files - Contains all the previous flight files found.
   * @var {Array} flights - Contains an array of objects with flights that matched the specified criteria.
   * @var {Object} flightInfo - Contains the info for each flight that matched the specified criteria.
   */
  search: async function (req, res) {
    const numeral = require("numeral")
    const fs = require('fs');
    const path = require('path')
    const glob = require("glob-fs")()
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var activity = req.param('activity')
    var testnum = numeral(test).value()
    var search = "";
    var aircraftHeaders = [];
    var flights = [];
    var files;
    var root = await sails.helpers.getSettings(activity, 'AutoValCSVDirectory')
    /**
     * Search for files with test numbers that matches specified entries
     */
    for (let x = 0; x < entries; x++) {
      testnum = numeral(testnum).value() -1;
      testnum = testnum.toString(10).padStart(4,"0")
      search = aircraft + '*' + testnum + '*.csv';
      files = glob.readdirSync(search, {cwd: root})
    }
    /** 
     * Filter duplicate files and parse/save information for each one that matches the type and/or parameter criteria.
     */
    files = [...new Set(files)]
    if (files.length) {
      files.forEach(function (file) {
        var Papa = require('papaparse');
        var cont = 0;
        var index = 0;
        var content = fs.readFileSync(path.join(root, file), "utf8");
        var name = path.parse(file).name
        var found_types = [];
        /** 
         * Parsing file content
         */
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
                  found_types.push(results.data[i]["TYPE"])
                } else continue
              } else {
                if (results.data[i]["PARAMETER"] == param) {
                  cont += 1;
                  index = i;
                  found_types.push(results.data[i]["TYPE"])
                } else continue
              }
            }
            found_types = [...new Set(found_types)]
            if (cont > 0) {
              var flightInfo = {};
              flightInfo["YEAR"] = results.data[index]["YEAR"]
              flightInfo["AIRCRAFT"] = results.data[index]["AIRCRAFT"]
              flightInfo["TEST"] = results.data[index]["TEST"]
              flightInfo["MR"] = name
              flightInfo["TYPE(S)"] = found_types
              flightInfo["ERRORS"] = cont
              flights.push(flightInfo)
            }
          }
        });
      })
    }
    if (!flights.length) {
      return res.view(`pages/Activities/${activity}/flights`, {
        info: flights,
        activity: activity
      })
    }
    aircraftHeaders = Object.keys(flights[0])
    return res.view(`pages/Activities/${activity}/flights`, {
      info: flights,
      headers: aircraftHeaders,
      activity: activity
    })
  }
}
