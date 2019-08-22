const moment = require("moment")
const internal_format = "DDD-HH:mm:ss.SSS"
// IDA does not give a year info for parameters
moment.now = function () {
  return moment.unix(0)
}
module.exports = {
  _TIME: {
    type: "line",
    yref: "paper",
    x0: 1,
    y0: 0,
    x1: 1,
    y1: 1,
    line: {
      color: "rgb(255, 0, 0)",
      width: 1
    }
  },
  OUT_OF_BOUNDS: [{
      type: "line",
      xref: "paper",
      x0: 1,
      y0: 0,
      x1: 1,
      y1: 1,
      line: {
        color: "rgb(0, 0, 255)",
        width: 1
      }
    },
    {
      type: "line",
      xref: "paper",
      x0: 1,
      y0: 0,
      x1: 1,
      y1: 1,
      line: {
        color: "rgb(0, 0, 255)",
        width: 1
      }
    }
  ],
  CONSTANT_VALUE: [{
    type: "line",
    xref: "paper",
    x0: 1,
    y0: 2,
    x1: 1,
    y1: 2,
    line: {
      color: "rgb(0, 0, 255)",
      width: 1
    }
  }],
  generate: function (type, values, times) {
    switch (type) {
      case "OUT_OF_BOUNDS":
        var options = JSON.parse(JSON.stringify(this.OUT_OF_BOUNDS))
        if (values[0] !== values[1]) {
          options[0].y0 = parseFloat(values[0])
          options[0].y1 = options[0].y0
          options[1].y0 = parseFloat(values[1])
          options[1].y1 = options[1].y0
        }
        break;
      case "CONSTANT_VALUE":
        var options = JSON.parse(JSON.stringify(this.CONSTANT_VALUE))
        options.y0 = parseFloat(value[0])
        options.y1 = options.y0
        break;
      default:
        var options = []
    }
    if (times !== undefined) {
      if (times.length == 2) {
        // Special Trickery to avoid timezone shifts
        var start = JSON.parse(JSON.stringify(this._TIME))
        start.x0 = new moment.utc(times[0].format(internal_format), internal_format).toISOString()
        start.x1 = start.x0
        var end = JSON.parse(JSON.stringify(this._TIME))
        end.x0 = new moment.utc(times[1].format(internal_format), internal_format).toISOString()
        end.x1 = end.x0
        options.push(start)
        options.push(end)
      }
    }
    return options
  }
}