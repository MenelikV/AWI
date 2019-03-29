module.exports = {
  search: async function (req, res) {
    var glob = require('glob');
    const numeral = require("numeral")
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var activity = req.param('activity')
    var testnum = numeral(test).value()
    console.log(testnum)
    var search = "";
    var aircraftHeaders = [];
    var flights = [];
    var files;
    var fs = require('fs');
    var path = require('path')
    var glob = require("glob-fs")()
    var root = await sails.helpers.getSettings(activity, 'AutoValCSVDirectory')
    for (let x = 0; x < entries; x++) {
      testnum = numeral(testnum).value() -1;
      testnum = testnum.toString(10).padStart(4,"0")
      search = aircraft + '*' + testnum + '*.csv';
      files = glob.readdirSync(search, {cwd: root})
    }
 
    files = [... new Set(files)]
    if (files.length) {
      files.forEach(function (file) {
        var Papa = require('papaparse');
        var cont = 0;
        var index = 0;
        var content = fs.readFileSync(path.join(root, file), "utf8");
        var name = path.parse(file).name
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
              flightInfo["MR"] = name
              flightInfo["ERRORS"] = cont
              flightInfo["CRITICITY"] = ''
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
