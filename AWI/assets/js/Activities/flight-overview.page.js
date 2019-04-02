$(document).ready(function () {

  //Save selected tab for refresh/back button
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    localStorage.setItem('activeTab', $(e.target).attr('href'));
  });
  var activeTab = localStorage.getItem('activeTab');
  if (activeTab) {
    $('#nav-tab a[href="' + activeTab + '"]').tab('show');
  }

  $("#typeSwitch").on('click', function () {
    if ($("#typeSwitch").hasClass("active")) {
      $("#type_header").removeClass('enabled-th').addClass('disabled-th')
      $("#modal_type").prop('disabled', true);
    } else {
      $("#type_header").removeClass('disabled-th').addClass('enabled-th')
      $("#modal_type").prop('disabled', false);
    }
  })

  $("#phaseSwitch").on('click', function () {
    if ($("#phaseSwitch").hasClass("active")) {
      // PVOL
      $("#full").hide()
      $("#pvol").show()
    } else {
      // Full flight
      $("#pvol").hide()
      $("#full").show()
    }
  })

  $('#search').on('click', function () {
    $("#typeSwitch").hasClass("active") ? "" : $("#modal_type").val("");
  })

  $("table[id*='subtable_']").DataTable({
    initComplete: function () {
      var colCount = this.api().columns().header().length;
      this.api().columns().every(function () {
        var column = this;
        var select = $('<select class="selctpicker" multiple></select>');
        if (column.index() === colCount) {
          return
        }
        select.appendTo($("#filter_row").find("th").eq(column.index()).empty())
          .on('change.bs.select', function () {
            var criteria = $(this).val().map(function (d) {
              return '^' + d + '$'
            }).join("|")
            column
              .search(criteria, true, false)
              .draw();
          });
        column.data().unique().sort().each(function (d, j) {
          select.append(`<option value="${d}">${d}</option>`)
        });
        select.selectpicker({
          style: 'btn btn-sm filter rounded-0 border-left-0 border-right-0 border-top-0',
          liveSearch: true,
          liveSearchPlaceholder: "Search for filters",
          title: "Filter",
          width: 100
        });
        select.selectpicker('setSize');
      });
    },
    paging: true,
    "autoWidth": false,
    "pageLength": 5,
    "lengthMenu": [
      [5, 10, 25, -1],
      [5, 10, 25, "All"]
    ],
    "order": [
      [3, "asc"]
    ],
    "columnDefs": [{
      targets: [-1],
      searchable: false,
      sortable: false
    }]
  })


  $("#pvol tbody").on("click", "a[id*='subtable_']", function (event) {
    var data = $(this).attr('id').split('-')
    $("table[id="+data[0]+"]").DataTable().search(data[1]).draw()
    event.stopPropagation();
    $("#"+data[0].replace("subtable","demo")).show('1500')
  });

  $("#pvol tbody").on("click","tr", function (event){
    demo_table = $(this).closest("tr").attr('id').split("-")
    $("table[id="+demo_table[1].replace("demo","subtable")+"]").DataTable().search("").draw()
    $("#"+demo_table[1]).toggle('1500')
  })



  $("table[id*='subtable_']").on("click", 'button[data-id="see_par"]', function () {
    var row = $(this).parents('tr')[0]
    var table = $(this).parents('table')[0]
    dt = $(table).DataTable()
    // Show Modal (Clear context before showing anything)
    var ctx = document.getElementById("canvas").getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    headers = dt.columns().header().map(function(d){return $(d).text().trim()})
    values = dt.row(row).data()
    // Inspired from https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays
    row_data = headers.reduce((o, k, i) => ({...o, [k]: values[i]}), {})
    row_data["MR"] = ($(this).data("mr"))
    $("#spinnerModal").modal("show")
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
              displayFormats: {
                second: "HH:mm:ss"
              },
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

  /** 
   * Filling in fields on the search modal
   */
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

  /** 
   * Filling in fields on the filter modal
   */
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
