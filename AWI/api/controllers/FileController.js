/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    getInfo: async function (req, res) {
        var fs = require('fs');
        var folderpath = 'C:/Users/vmasiero.ASSYSTEM/AWI/AWI/.tmp/csv';

        fs.readdir(folderpath, function (err, files) {
            //handling error
            if (err) { return console.log('Unable to scan directory: ' + err) }
            
            var Papa = require('papaparse');
            var path = require('path');
            var headers = [];
            var finalData = [];
            var fileName = [];
            var flights = [];
            var counts = {};
            var paramName = [];
            //listing all files
            files.forEach(function (file) {
                var param = [];
                var type = [];
                fileName.push(file)
                var filePath = path.join(folderpath, file)
                var content = fs.readFileSync(filePath, "utf8");
                //parsing file content
                Papa.parse(content, {
                    header: true,
                    delimiter: ";",
                    skipEmptyLines: true,
                    complete: function (results) {
                        headers.push(results.meta["fields"])
                        finalData.push(results.data)

                        results.data.forEach(function (error) {
                            param.push(error["PARAMETER"])
                            type.push(error["TYPE"])
                        })

                        for (var i = 0; i < param.length; i++) {
                            var num = param[i];
                            counts[num] = counts[num] ? counts[num] + 1 : 1;
                        }

                        paramName = Object.keys(counts);
                        for (var i = 0; i < paramName.length; i++) {
                            var flightInfo = {};
                            flightInfo["AIRCRAFT"] = results.data[0]["AIRCRAFT"]
                            flightInfo["MSN"] = results.data[0]["TEST"]
                            flightInfo["PARAMETER"] = paramName[i]
                            flightInfo["TYPE"] = results.data[i]["TYPE"]
                            flights.push(flightInfo)
                        }
                        headers = Object.keys(flights[0])
                    }
                });
            });
            res.status(200)
            return res.view("pages/flights", { info: flights, headers: headers })
        });
    },

    getFlightOverview: async function (req, res) {
        var fs = require('fs');
        var fileName = 'Output_PVOL-' + req.param('id') + '.csv';
        var filePath = 'C:/Users/vmasiero.ASSYSTEM/AWI/AWI/.tmp/pvol/' + fileName;

        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                console.log('Could not read the file ', err)
                return res.redirect('/')
            }
            var Papa = require('papaparse');
            var flightHeader;
            var flightData;
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