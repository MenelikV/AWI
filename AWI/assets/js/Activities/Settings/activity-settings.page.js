$(document).ready(function () {
  $('#change_csv').on('click', function () {
    var file = 'CSV'
    var csv = $("#csv_dir").val();
    var activity = $("#change_csv").attr('name')
    var url = '/Activities/' + activity + '/changeDirectory'

    data = {
      directory: csv,
      file: file
    }
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function success() {
        $('#change_csv').removeClass("btn-primary").addClass("btn-success").html("Changes Saved")
      },
      error: function error() {
        $('#change_csv').removeClass("btn-primary").addClass("btn-danger").html("Invalid Directory")
      }
    })
  })

  $("#csv_dir").on('click', function () {
    $('#change_csv').removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary").html("apply")
  })

  $('#change_pvol').on('click', function () {
    var file = 'PVOL'
    var pvol = $("#pvol_dir").val();
    var activity = $("#change_pvol").attr('name')
    var url = '/Activities/' + activity + '/changeDirectory'
    data = {
      directory: pvol,
      file: file
    }
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function success() {
        $('#change_pvol').removeClass("btn-primary").addClass("btn-success").html("Changes Saved")
      },
      error: function error() {
        $('#change_pvol').removeClass("btn-primary").addClass("btn-danger").html("Invalid Directory")
      }
    })
  })
  $("#pvol_dir").on('click', function () {
    $('#change_pvol').removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary").html("apply")
  })
})
