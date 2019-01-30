$(document).ready(function () {
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
  $("table[id^='subtable_']").DataTable({
    paging: false,
  })
  $("table[id^='full_subtable_']").DataTable({
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
  var patch = function(list){
    return list.map(function(d){
      return {
        x: new Date(d.x),
        y: d.y
      }
    })
  }
  var createPlot = function (data, status) {
    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    var datasets = []
    for(let p of data.par){
      var color = dynamicColors()
      datasets.push({
          label: p,
          data: patch(data.data_res[p]),
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
          annotations: data.annotations
        },
        title: {
          display: true,
          text: data.text
        },
        scales: {
          xAxes: [{
            type: "time",
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

  $('button[data-id="search_par"]').each(function () {
    $(this).on('click', function (evt) {
      var row = $(this).parents('tr')[0]
      for (var i = 0; i < row.cells.length - 1; i++) {
        row.cells[i].id == "AIRCRAFT" ? $("#modal_aircraft").val(row.cells[i].innerText) : "";
        row.cells[i].id == "TEST" ? $("#modal_test").val(row.cells[i].innerText) : "";
        row.cells[i].id == "PARAMETER" ? $("#modal_param").val(row.cells[i].innerText) : "";
        row.cells[i].id == "TYPE" ? $("#modal_type").val(row.cells[i].innerText) : "";
      }
      $('#searchModalCenter').modal('show');
    })
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
  $('button[data-id="filter_par"]').each(function () {
    $(this).on('click', function (evt) {
      var row = $(this).parents('tr')[0]
      for (var i = 0; i < row.cells.length - 1; i++) {
        row.cells[i].id == "AIRCRAFT" ? $("#filter_aircraft").val(row.cells[i].innerText) : "";
        row.cells[i].id == "TEST" ? $("#filter_test").val(row.cells[i].innerText) : "";
        row.cells[i].id == "TYPE" ? $("#filter_type").val(row.cells[i].innerText) : "";
      }
      $('#filterModalCenter').modal('show');
    })
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
      aircraft: $("#filter_aircraft").val(),
      test: $("#filter_test").val(),
      type: $("#filter_type").val(),
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
