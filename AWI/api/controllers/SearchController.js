const fs = require("fs")
module.exports = {
  search: async function (req, res) {
    var aircraft = req.param('aircraft')
    var param = req.param('parameter')
    var type = req.param('type')
    var entries = req.param('entries')
    var activity = req.param('activity')
    var docs = [];
    var folderpath = await sails.helpers.getSettings(activity, 'AutoValCSVDirectory');
    if(!fs.lstatSync(folderpath).isDirectory()){
        return res.serverError(`Problem with following folderpath ${folderpath} for Activity ${activity}`)
    }
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
        }
      }
      if (!flights.length) {
        return res.serverError("nothingfound")
      }
      aircraftHeaders = Object.keys(flights[0])
      return res.view(`pages/Activities/${activity}/flights`, {
        info: flights,
        headers: aircraftHeaders,
        activity: activity
      })
    });
  }
}