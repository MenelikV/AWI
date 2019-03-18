$(document).ready(function () {

  //Save selected tab for refresh/back button
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    localStorage.setItem('activeTab', $(e.target).attr('href'));
  });
  var activeTab = localStorage.getItem('activeTab');
  if (activeTab) {
    $('#nav-tab a[href="' + activeTab + '"]').tab('show');
  }

  var toggleHandler = function () {
    if ($("#phaseSwitch").hasClass("active")) {
      // PVOL
      $("#full").hide()
      $("#pvol").show()
    } else {
      // Full flight
      $("#pvol").hide()
      $("#full").show()
    }
  }
  //toggleHandler()
  $("table[id*='subtable_']").DataTable({
    paging: true,
    "autoWidth": false,
    "pageLength": 5,
    "lengthMenu": [
      [5, 10, 25, -1],
      [5, 10, 25, "All"]
    ],
    "order": [
      [3, "asc"]
    ]
  })
  $("table[id*='subtable_']").on("click", 'button[data-id="see_par"]', function () {
    var row = $(this).parents('tr')[0]
    var table = $(this).parents('table')[0]
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
  var patch_annotations = function (list) {
    return list.map(function (d) {
      if (d.mode === "vertical") {
        d.value = new Date(d.value)
      }
      return d
    })
  }
  var createPlot = function (data, status) {
    var dynamicColors = function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    var datasets = []
    for (let p of data.par) {
      var color = dynamicColors()
      datasets.push({
        label: p,
        data: data.data_res[p],
        fill: false,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      })
    }
    var config = {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        annotation: {
          events: ["click"],
          annotations: patch_annotations(data.annotations)
        },
        title: {
          display: true,
          text: data.text
        },
        scales: {
          xAxes: [{
            type: "time",
            time: {
              timeFormat: 'YYYYY-MM-DD[T]HH:mm:ss.SSS',
              tooltipFormat: "HH:mm:ss.SSS"
            }
          }]
        },
        // Container for pan options
        pan: {
          // Boolean to enable panning
          enabled: true,

          // Panning directions. Remove the appropriate direction to disable 
          // Eg. 'y' would only allow panning in the y direction
          mode: 'xy'
        },

        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,
          drag: false,

          // Zooming directions. Remove the appropriate direction to disable 
          // Eg. 'y' would only allow zooming in the y direction
          mode: 'xy',
        }
      }
    }
    $("#spinnerModal").modal("hide")
    $("#canvas").remove()
    $("#canvasContainer").append('<canvas id="canvas"></canvas>')
    var ctx = document.getElementById("canvas").getContext("2d")
    new Chart(ctx, config)
    $("#plotModal").modal("show")
    $("#plotModal").modal("handleUpdate")
  }

  $("table[id*='subtable_']").on("click", 'button[data-id="search_par"]', function () {
    var row = $(this).parents('tr')[0]
    for (var i = 0; i < row.cells.length - 1; i++) {
      row.cells[i].id == "AIRCRAFT" ? $("#modal_aircraft").val(row.cells[i].innerText) : "";
      row.cells[i].id == "TEST" ? $("#modal_test").val(row.cells[i].innerText) : "";
      row.cells[i].id == "PARAMETER" ? $("#modal_param").val(row.cells[i].innerText) : "";
      row.cells[i].id == "TYPE" ? $("#modal_type").val(row.cells[i].innerText) : "";
    }
    $('#searchModalCenter').modal('show');
  })

  $('#searchModalCenter').on('shown.bs.modal', function () {
    $('#modal_entries').focus();
  })
  $("#phaseSwitch").click(toggleHandler)
  $('#type_check').on('click', function () {
    $("#modal_type").prop('disabled', function (_, val) {
      return !val;
    });
  })
  $('#save').on('click', function () {
    $("#modal_type").prop("disabled") ? $("#modal_type").val("") : "";
  })

  $("table[id*='subtable_']").on("click", 'button[data-id="filter_par"]', function () {
    var row = $(this).parents('tr')[0]
    for (var i = 0; i < row.cells.length - 1; i++) {
      row.cells[i].id == "AIRCRAFT" ? $("#filter_aircraft").html(row.cells[i].innerText) : "";
      row.cells[i].id == "TEST" ? $("#filter_test").html(row.cells[i].innerText) : "";
      row.cells[i].id == "TYPE" ? $("#filter_type").html(row.cells[i].innerText) : "";
      row.cells[i].id == "PARAMETER" ? $("#filter_parameter").html(row.cells[i].innerText) : "";
      row.cells[i].id == "PHASE" ? $("#filter_phase").html(row.cells[i].innerText) : "";
    }
    $('#filterModalCenter').modal('show');
  })

  $('#filter').on('click', function () {
    var callbackStyles = {
      display: 'block',
      cursor: 'default'
    }
    $("#filter").css("display", "none")
    $("#filter_load").css(callbackStyles)
    var url = '/createFilter/' + $("#filter_activity").val()
    var data = {
      aircraft: $("#filter_aircraft").text(),
      test: $("#filter_test").text(),
      type: $("#filter_type").text(),
      parameter: $("#filter_parameter").text(),
      phase: $("#filter_phase").text()
    }
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function success() {
        $("#filter_load").css("display", "none")
        $("#filter").css(callbackStyles).prop('disabled', true)
        $("#filter").removeClass('btn-primary').addClass('btn-success').html("Filter added!")

      },
      error: function error() {
        $("#filter_load").css("display", "none")
        $("#filter").css(callbackStyles).attr('disabled', true)
        $("#filter").removeClass('btn-primary').addClass('btn-danger').html("Filter Already Exists")
      }
    })
  })
  $('#filterModalCenter').on('hidden.bs.modal', function () {
    $("#filter_load").css("display", "none")
    $("#filter").css({
      'display': 'block',
      'cursor': 'pointer'
    }).prop('disabled', false)
    $("#filter").removeClass('btn-danger').removeClass('btn-success').addClass('btn-primary').html("Add Filter")
  })

})
