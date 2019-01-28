/**
 * ActivityController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  "MCI": {
    "longName": "Weight and Balance",
    "AutoValCSVDirectory": "assets/test_files/mci/csv/",
    //"PVOLCSVDirectory": "assets/test_files/pvol/",
    "discipline": "/perf/"
  },
  "DGPS": {
    "longName": "Trajectography",
    "AutoValCSVDirectory": "assets/test_files/dgps/csv/",
    "PVOLCSVDirectory": "assets/test_files/dgps/pvol/",
    "SummaryINFODirectory": "assets/test_files/dgps/info/",
    "discipline": "/perf/"
  },
  "ANEMO": {
    "longName": "Anemometry",
    "AutoValCSVDirectory": "assets/test_files/anemo/csv",
    "discipline": "/perf/"
  }
}