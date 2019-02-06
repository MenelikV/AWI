const fs = require("fs")
module.exports = {
  search: async function (req, res) {
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var activity = req.param('activity')
    var testnum = test.replace(/[^0-9]/g, '')
    var search = "";
    var aircraftHeaders = [];
    var flights = [];
    var files;
    var fs = require('fs');
    var glob = require("glob-fs")()
    for (let x = 0; x < entries; x++) {
      testnum -= 1;
      search = await sails.helpers.getSettings(activity, 'AutoValCSVDirectory') + "\\" + aircraft + '*' + testnum + '*.csv';
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
      return res.view(`pages/Activities/${activity}/flights`, {
        info: undefined,
        headers: undefined,
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
