$(document).ready(function () {
  var mci_trinity = ["init", "start", "end"]
  for (var i = 0; i < mci_trinity.length; i++) {
    var timepicker = $("#timepicker_" + mci_trinity[i])
    var start_date = timepicker.data("start")
    var end_date = timepicker.data("end")
    var default_date = timepicker.data("default")
    timepicker.datetimepicker({
      format: "HH:mm:ss",
      minDate: start_date,
      maxDate: end_date,
      useCurrent: false,
      defaultDate: default_date,
    })
    $("#change_" + mci_trinity[i] + "_gmt").click(function () {
      var type = this.id.replace("change_", "").replace("_gmt", "")
      var input_selector = "#" + type + "_gmt"
      var input = $(input_selector)
      time = input.val(),
        mr = input.data("mr")
      url = window.location.pathname + "/update"
      $("#spinnerModal").modal("show")
      $.ajax({
        method: "POST",
        url: url,
        data: {
          type: type,
          time: time,
          mr: mr
        },
        error: function () {
          $("#spinnerModal").modal("hide")
          alert("Updating " + type + " GMT Failed")
        },
        success: function (new_data) {
          $("#spinnerModal").modal("hide")
          console.table(new_data)
          $('[data-id='+type+']').each(function (i, d) {
            var p = $(d.closest("tr")).data("id")
            $(d).text(new_data[p])
          })
        }
      })
    })
  }
})
