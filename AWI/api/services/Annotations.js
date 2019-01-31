const moment = require("moment")
const internal_format = "HH:mm:ss.SSS"
moment.now = function () {
  return moment.unix(0)
}
module.exports = {
  _TIME: {
    type: "line",
    mode: "vertical",
    scaleID: "x-axis-0",
    value: 0,
    borderColor: "red",
    borderWidth: 0.5,
  },
  OUT_OF_BOUNDS: [{
      type: "line",
      mode: "horizontal",
      scaleID: "y-axis-0",
      value: 0,
      borderColor: "blue",
      borderWidth: 0.5,
    },
    {
      type: "line",
      mode: "horizontal",
      scaleID: "y-axis-0",
      value: 0,
      borderColor: "blue",
      borderWidth: 0.5,
    }
  ],
  CONSTANT_VALUE: [{
    type: "line",
    mode: "horizontal",
    scaleID: "y-axis-0",
    value: 0,
    borderColor: "blue",
    borderWidth: 0.5,
  }],
  generate: function (type, values, times) {
    switch (type) {
      case "OUT_OF_BOUNDS":
        var options = JSON.parse(JSON.stringify(this.OUT_OF_BOUNDS))
        if (values[0] !== values[1]) {
          options[0].value = parseFloat(values[0])
          options[1].value = parseFloat(values[1])
        }
        break;
      case "CONSTANT_VALUE":
        var options = JSON.parse(JSON.stringify(this.CONSTANT_VALUE))
        options.value = parseFloat(value[0])
        break;
      default:
        var options = []
    }
    if (times !== undefined) {
      if (times.length == 2) {
        var start = JSON.parse(JSON.stringify(this._TIME))
        start.value = new moment(times[0].format(internal_format), internal_format).toISOString()
        var end = JSON.parse(JSON.stringify(this._TIME))
        end.value = new moment(times[1].format(internal_format), internal_format).toISOString()
        options.push(start)
        options.push(end)
      }
    }
    return options
  }
}