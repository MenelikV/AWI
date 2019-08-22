$(document).ready(function () {

  /**
   * START OVERVIEW LAYOUT LOGIC
   */

  //Save current selected tab for refresh/back button
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    localStorage.setItem('activeTab', $(e.target).attr('href'));
  });
  var activeTab = localStorage.getItem('activeTab');
  if (activeTab) {
    $('#nav-tab a[href="' + activeTab + '"]').tab('show');
  }

  //Toggle between phases and full flight table
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

  //Display specific subtable results based on selected error type (ANEMO)
  $('#pvol, #full').on("click", "a.type", function (event) {
    event.stopPropagation();
    div_id = $(this).closest("tr").attr('id').split('-')[1]
    table_id = $(this).attr('id').split('-')[0]
    error_type = $(this).attr('id').split('-')[1]
    $("#" + table_id).DataTable().search(error_type).draw()
    $("#" + div_id).show('200')
  });

  //Display full subtable results (ANEMO)
  $('#pvol, #full').on("click", "tr.hover", function (event) {
    div_id = $(this).closest("tr").attr('id').split("-")[1]
    table_id = $(this).find("a").attr('id').split("-")[0]
    $("#" + table_id).DataTable().search("").draw()
    $("#" + div_id).toggle('200')
  })

  //Display last clicked subtable button as 'active' after clicking it
  $("table[id*='subtable_']").on("click", 'button.btn-light', function (event) {
    $('.btn-light').removeClass('active');
    $(this).addClass('active');
    event.stopPropagation();
  })

  //Remove 'active' state of subtable button after clicking anywhere else
  $("#nav-profile").on('click', function (event) {
    $('.btn-light').removeClass('active');
  })


  /**
   * START SEARCH MODAL LOGIC
   */

  //Filling in fields and displaying the search modal
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

  //Toggle type input field and button on type selection/unselection
  $("#typeSwitch").on('click', function () {
    if ($("#typeSwitch").hasClass("active")) {
      $("#type_header").removeClass('enabled-th').addClass('disabled-th')
      $("#modal_type").prop('disabled', true);
    } else {
      $("#type_header").removeClass('disabled-th').addClass('enabled-th')
      $("#modal_type").prop('disabled', false);
    }
  })

  //Assign value of type field if selected/unselected
  $('#search').on('click', function () {
    $("#typeSwitch").hasClass("active") ? "" : $("#modal_type").val("");
  })


  /**
   * START FILTER MODAL LOGIC
   */

  //Filling in fields and displaying the filter modal
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

  //AJAX post on new filter creation and button CSS editing on success/error
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


  /**
   * START PLOT MODAL LOGIC
   */

  $("table[id*='subtable_']").on("click", 'button[data-id="see_par"]', function () {
    var row = $(this).parents('tr')[0]
    var table = $(this).parents('table')[0]
    dt = $(table).DataTable()
    headers = dt.columns().header().map(function (d) {
      return $(d).text().trim()
    })
    values = dt.row(row).data()
    // Remove font color tag (ANEMO)
    try{
      values = values.map(d=>$.parseHTML(d)[0].innerText.trim())
    }
    catch(error){
      // Do nothing if it fails
    }
    // Inspired from https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays
    row_data = headers.reduce((o, k, i) => ({
      ...o,
      [k]: values[i]
    }), {})
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
  var createPlot = function (data, status) {
    $("#spinnerModal").modal("hide")
    Plotly.newPlot('PlotModalContainer', data.traces, data.layout, {scrollZoom: true})
    $("#plotModal").modal("show")
    $("#plotModal").modal("handleUpdate")
  }
  /**
   * LOAD DATA (ANEMO)
   */
  var createAnemoChart = function (data, status) {
    Plotly.newPlot('anemoChartContainergroup', data.group.traces, data.group.layout, {scrollZoom: true, modeBarButtonsToRemove: ['autoScale2d']})
    for(let k of Object.keys(data)){
      if(k !== "group"){
        Plotly.newPlot(k, data[k].trace, data[k].layout, {scrollZoom: true})
      }
    }

    $("#spinnerModal").modal("hide")

  }
  $("#load_data").click(function(){
    var mr = $(this).data('mr')
    $("#spinnerModal").modal("show");
    $.ajax({
      url: "/Activities/Anemo/chart",
      data: {
        mr: mr
      },
      type: "GET",
      success: createAnemoChart,
      error: function(){
        alert("Error")
        $("#spinnerModal").modal("hide")
      }
    })
  })
  /**
   * See CAS/ZRA (Anemo)
   */
  $("table[id*='pvol']").on("click", 'button[data-id="see_cas"]', function () {
    row_data = {}
    row_data["MR"] = ($(this).data("mr"))
    let format = "DDD-HH:mm:ss-SSS"
    row_data["START"] = new moment($(this).data("start"),format).format(format)
    row_data["END"] = new moment($(this).data("end"), format).format(format)
    $("#spinnerModal").modal("show")
    $.ajax({
      //datatype: "json",
      url: "/Activities/Anemo/caschart",
      data: {
        row: row_data
      },
      type: "GET",
      success: createCasPlot,
      error: function () {
        $("#spinnerModal").modal("hide")
        alert("Fetching Data Failed")
      }
    })
  })
  var createCasPlot = function (data, status) {
    // Config is given by the server this time around
    $("#spinnerModal").modal("hide")
    Plotly.newPlot('AnemoCAS', data.trace, data.layout, {scrollZoom: true})
    $("#plotAnemoModal").modal("show")
    $("#plotAnemoModal").modal("handleUpdate")
  }

  /**
   * START DATATABLES CONFIGURATIONS
   */

  //Error tables configuration
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

  //Filters table configuration (ANEMO)
  $("#applied_filters").DataTable({
    "pageLength": 5,
    "lengthMenu": [
      [5, 10, 25, -1],
      [5, 10, 25, "All"]
    ],
    "order": [
      [1, "asc"]
    ]
  })

})
