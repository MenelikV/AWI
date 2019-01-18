module.exports = {
    _TIME : {
      drawTime: "afterDatasetsDraw",
      id: "vline",
      type: "line",
      mode: "vertical",
      scaleID: "x-axis-0",
      value: 0,
      borderColor: "red",
      borderWidth: 0.5,
    },
    OUT_OF_BOUNDS : [
        {
            drawTime: "afterDatasetsDraw",
            id: "hline",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 0,
            borderColor: "blue",
            borderWidth: 0.5,
          },
          {
            drawTime: "afterDatasetsDraw",
            id: "hline",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 0,
            borderColor: "blue",
            borderWidth: 0.5,
          }
    ],
    CONSTANT_VALUE: [
        {
            drawTime: "afterDatasetsDraw",
            id: "hline",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 0,
            borderColor: "blue",
            borderWidth: 0.5,
          }
    ],
    generate: function(type, values, times){
        switch(type){
            case "OUT_OF_BOUNDS":
                var options = JSON.parse(JSON.stringify(this.OUT_OF_BOUNDS))
                if(values[0] !== values[1])
                {
                  options[0].value = parseFloat(values[0])
                  options[1].value = parseFloat(values[1])
                }
                break;
            case "CONSTANT_VALUE":
                var options = JSON.parse(JSON.stringify(this.CONSTANT_VALUE))
                options.value = parseFloat(value[0])
                break;
            default:
              var options = [{}]
        }
        if(times !== undefined){
          if(times.length == 2){
            var start = this._TIME
            start.value = times[0]
            var end = this._TIME
            end.value = times[1]
            options.push(start)
            options.push(end)
          }
        }
        return options
    }
}