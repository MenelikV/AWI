/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    getInfo: async function (req, res) {
        var fs = require('fs');
        const folderpath = 'C:/Users/vmasiero.ASSYSTEM/test/.tmp/csv';

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
                        flightInfo["CRITICITY"] = ''
                        flights.push(flightInfo)
                    }
                });
            });
            aircraftHeaders = Object.keys(flights[0])
            return res.view("pages/flights", { info: flights, headers: aircraftHeaders })
        });
    },

    getFlightOverview: async function (req, res) {
        var fileName = 'Output_PVOL-' + req.param('id') + '.csv';
        var filePath = 'C:/Users/vmasiero.ASSYSTEM/test/.tmp/pvol/' + fileName;
        var fs = require('fs');

        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                console.log('Could not read the file ', err)
                return res.redirect('/')
            }
            var Papa = require('papaparse');
            var flightHeader;
            var flightData
            var content = data;
            Papa.parse(content, {
                header: true,
                delimiter: ";",
                skipEmptyLines: true,
                complete: function (results) {
                    flightHeader = results.meta["fields"]
                    flightData = results.data
                }
            })
            return res.view("pages/flight-overview", { headers: flightHeader, data: flightData, name: fileName })
        });
    }
}