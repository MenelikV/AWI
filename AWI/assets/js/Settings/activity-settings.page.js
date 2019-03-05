$(document).ready(function () {
  $('#change_csv').on('click', function () {
    var dir = $("#csv_dir").val();
    var activityName = $("#change_csv").attr('name')
    var setting = $("#csv_dir").attr('name')
    var url = '/Settings/changeSettings' 
    data = {
      activityName: activityName,
      setting: setting,
      directory: dir
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
    var dir = $("#pvol_dir").val();
    var activityName = $("#change_pvol").attr('name')
    var setting = $("#pvol_dir").attr('name')
    var url = '/Settings/changeSettings'
    data = {
      activityName: activityName,
      setting: setting,
      directory: dir
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

  $('#change_info').on('click', function () {
    var dir = $("#info_dir").val();
    var activityName = $("#change_info").attr('name')
    var setting = $("#info_dir").attr('name')
    var url = '/Settings/changeSettings'
    data = {
      activityName: activityName,
      setting: setting,
      directory: dir
    }
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function success() {
        $('#change_info').removeClass("btn-primary").addClass("btn-success").html("Changes Saved")
      },
      error: function error() {
        $('#change_info').removeClass("btn-primary").addClass("btn-danger").html("Invalid Directory")
      }
    })
  })
  $("#info_dir").on('click', function () {
    $('#change_info').removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary").html("apply")
  })

  $('#change_discipline').on('click', function () {
    var dir = $("#discipline_dir").val();
    var activityName = $("#change_discipline").attr('name')
    var setting = $("#discipline_dir").attr('name')
    var url = '/Settings/changeSettings'
    data = {
      activityName: activityName,
      setting: setting,
      directory: dir
    }
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function success() {
        $('#change_discipline').removeClass("btn-primary").addClass("btn-success").html("Changes Saved")
      },
      error: function error() {
        $('#change_discipline').removeClass("btn-primary").addClass("btn-danger").html("Invalid Directory")
      }
    })
  })
  $("#discipline_dir").on('click', function () {
    $('#change_discipline').removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary").html("apply")
  })
  
})
