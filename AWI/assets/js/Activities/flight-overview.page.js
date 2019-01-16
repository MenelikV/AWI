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
    $("#spinnerModal").modal("hide")
    var ctx = document.getElementById("canvas").getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    window.chart = new Chart(ctx, data)
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
