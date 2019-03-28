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
      } else {
        return res.view("pages/Settings/filter-settings", {
          activity: activity,
          headers: headers,
          info: data
        })
      }
    });
  },

  createFilter: async function (req, res) {
    var activity = req.param('id')
    var aircraft = req.param('aircraft')
    var test = req.param('test')
    var type = req.param('type')
    var parameter = req.param("parameter")
    var phase = req.param("phase")

    var duplicateFilter = await Filter.find({
      aircraft: aircraft,
      test: test,
      type: type,
      activity: activity,
      parameter: parameter,
      phase: phase
    })
    if (!duplicateFilter.length) {
      await Filter.create({
        activity: activity,
        aircraft: aircraft,
        test: test,
        type: type,
        parameter: parameter,
        phase: phase
      });
      return res.status(200).send()
    } else return res.serverError("Duplicate filter!")
  },


  deleteFilter: async function (req, res) {
    var id = req.param("id");
    try {
      await Filter.destroy({
        id: id
      })
      return res.status(200).send()
    } catch (err) {
      return res.serverError("Problem deleting the filter",err)
    }

  }
}
