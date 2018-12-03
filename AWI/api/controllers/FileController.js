/**
 * FileController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

    getInfo: async function (req, res) {

        var fs = require('fs');
        var Papa = require('papaparse');
        var path = require('path');
        var folderpath = 'C:/Users/vmasiero.ASSYSTEM/AWI/AWI/.tmp/files';

        var headers = [];
        var finalData = [];
        var fileName = [];

        fs.readdir(folderpath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files
            files.forEach(function (file) {
                fileName.push(file)
                var filePath = path.join(folderpath, file)
                var content = fs.readFileSync(filePath, "utf8");
                //parsing file content
                Papa.parse(content, {
                    header: true,
                    delimiter: ";",
                    complete: function (results) {
                        headers.push(results.meta["fields"])
                        finalData.push(results.data)
                    }
                });
            });
            res.status(200)
            return res.view("pages/error-files", { headers: headers, data: finalData, name: fileName })
        });
    }
}