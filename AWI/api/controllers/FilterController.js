/**
 * FilterController
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getFilters: async function (req, res) {
    var activity = req.param('id');
    var data = [];

    Filter.find({
      activity: activity
    }).exec(function (err, results) {
      if (err) {
        return res.serverError('error searching filters')
      }
      if (results.length) {
        var headers = Object.keys(results[0])
        results.forEach(function (item) {
          var filterInfo = {}
          for (let i = 0; i < headers.length; i++) {
            filterInfo[headers[i]] = item[headers[i]];
          }
          data.push(filterInfo)
        })

        return res.view("pages/Settings/filter-settings", {
          activity: activity,
          headers: headers,
          info: data
        })
      } else return res.serverError("no filters")
    });
  },

  createFilter: async function (req, res) {
    var activity = req.param('id')
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var type = req.param('type')

    var duplicateFilter = await Filter.find({
      aircraft: aircraft,
      test: test,
      type: type,
      activity: activity
    })
    if (!duplicateFilter.length) {
      await Filter.create({
        activity: activity,
        aircraft: aircraft,
        test: test,
        type: type
      });
      res.status(200)
      return res.send()
    } else return res.serverError("Duplicate filter!")
  },


  deleteFilter: async function (req, res) {
    var id = req.param("id");
    await Filter.destroy({
      id: id
    })
    res.status(200)
    return res.send()
  }
}
