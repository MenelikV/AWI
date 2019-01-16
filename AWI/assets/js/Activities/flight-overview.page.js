$(document).ready(function () {
  $("#spinnerModal").modal("hide")
  $("table[id^='subtable_']").DataTable({
    paging: false,
  })
  $('button[data-id="see_par"]').each(function () {
    $(this).on('click', function (evt) {
      var row = $(this).parents('tr')[0]
      var table = $(this).parents('table')[0]
      // TODO Create labels from row via ajx call
      // Show Modal (Clear context before showing anything)
      var ctx = document.getElementById("canvas").getContext("2d")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      $("#spinnerModal").modal("show")
      var row_data = {}
      // Ignore Last Columns (Actions)
      for (var i = 0; i < row.cells.length - 1; i++) {
        row_data[table.rows[0].cells[i].innerText] = row.cells[i].innerText
      }
      row_data["MR"] = ($(this).data("mr"))
      $.ajax({
        //datatype: "json",
        url: "/Activities/flightOverview/plot",
        data: {
          row: row_data
        },
        type: "GET",
        success: createPlot,
        error: function () {
          $("#spinnerModal").modal("hide")
          alert("Fetching Data Failed")
        }
      })

    })
  })

  var createPlot = function (data, status) {
    var test_dict = {
      type: 'line',
      data: {
          labels: data.labels,
          datasets: [{
              label: '# of Votes',
              data: data.values,
              fill: false,
              backgroundColor: "rgb(255,0,0,0.5)",
              borderColor: "rgb(255,0,0,0.5)",
              borderWidth: 0.5,
          }]
      },
      options: {
            annotation: {
            events: ["click"],
                    annotations: [
                    {
              drawTime: "afterDatasetsDraw",
              id: "hline",
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: data.start,
              borderColor: "black",
              borderWidth: 2,
              onClick: function(e) {
                // The annotation is is bound to the `this` variable
                console.log("Annotation", e.type, this);
              }
                    }
          ],
          },
          title:{
            display: true,
            text: data.title
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          // Container for pan options
          pan: {
              // Boolean to enable panning
              enabled: true,
  
              // Panning directions. Remove the appropriate direction to disable 
              // Eg. 'y' would only allow panning in the y direction
              mode: 'x'
          },
  
          // Container for zoom options
          zoom: {
              // Boolean to enable zooming
              enabled: true,
              drag: false,
              sensitivity: 0.0000000000000000000001,
  
              // Zooming directions. Remove the appropriate direction to disable 
              // Eg. 'y' would only allow zooming in the y direction
              mode: 'x',
          }
      }
  }
    $("#spinnerModal").modal("hide")
    $("#canvas").remove()
    $("#canvasContainer").append('<canvas id="canvas"></canvas>')
    var ctx = document.getElementById("canvas").getContext("2d")
    new Chart(ctx, test_dict)
    $("#plotModal").modal("show")
    $("#plotModal").modal("handleUpdate")
  }
  
  $('button[data-id="search_par"]').each(function () {
    $(this).on('click', function (evt) {
      var row = $(this).parents('tr')[0]

      for (var i = 0; i < row.cells.length - 1; i++) {
        row.cells[i].id == "AIRCRAFT" ? $("#modal_aircraft").val(row.cells[i].innerText) : "";
        row.cells[i].id == "PARAMETER" ? $("#modal_param").val(row.cells[i].innerText) : "";
        row.cells[i].id == "TYPE" ? $("#modal_type").val(row.cells[i].innerText) : "";
      }
      $('#exampleModalCenter').modal('show');
    })
  })

  $('#exampleModalCenter').on('shown.bs.modal', function () {
    $('#modal_entries').focus();
  })


})
