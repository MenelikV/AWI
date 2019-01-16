module.exports = {
    _TIME : {
      drawTime: "afterDatasetsDraw",
      id: "vline",
      type: "line",
      mode: "vertical",
      scaleID: "x-axis-0",
      value: 0,
      borderColor: "black",
      borderWidth: 0.1,
      label: {
        backgroundColor: "red",
        content: "Test Label",
        enabled: true
      },
      onClick: function(e) {
        // The annotation is is bound to the `this` variable
        console.log("Annotation", e.type, this);
      }
    },
    OUT_OF_BOUNDS : [
        {
            drawTime: "afterDatasetsDraw",
            id: "hline",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 0,
            borderColor: "black",
            borderWidth: 0.1,
            label: {
              backgroundColor: "red",
              content: "Test Label",
              enabled: true
            },
            onClick: function(e) {
              // The annotation is is bound to the `this` variable
              console.log("Annotation", e.type, this);
            }
          },
          {
            drawTime: "afterDatasetsDraw",
            id: "hline",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 0,
            borderColor: "black",
            borderWidth: 0.1,
            label: {
              backgroundColor: "red",
              content: "Test Label",
              enabled: true
            },
            onClick: function(e) {
              // The annotation is is bound to the `this` variable
              console.log("Annotation", e.type, this);
            }
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
            borderColor: "black",
            borderWidth: 0.1,
            label: {
              backgroundColor: "red",
              content: "Test Label",
              enabled: true
            },
            onClick: function(e) {
              // The annotation is is bound to the `this` variable
              console.log("Annotation", e.type, this);
            }
          }
    ],
    generate: function(type, values, times){
        switch(type){
            case "OUT_OF_BOUNDS":
                var options = this.OUT_OF_BOUNDS
                if(values[0] !== values[1])
                {
                  options[0].value = parseFloat(values[0])
                  options[0].label.content = "min"
                  options[1].value = parseFloat(values[1])
                  options[1].label.content = "max"
                }
                break;
            case "CONSTANT_VALUE":
                var options = this.CONSTANT_VALUE
                options.value = parseFloat(value[0])
                options.content ="constant"
                break;
            default:
              var options = [{}]
        }
        if(times !== undefined){
          if(times.length == 2){
            var start = this._TIME
            start.label.content = "start"
            start.value = times[0]
            var end = this._TIME
            end.label.content = "end"
            end.value = times[1]
            options.push(start)
            options.push(end)
          }
        }
        return options
    }
}