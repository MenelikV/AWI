$(document).ready(function(){
  picker = $("#modal_color").colorpicker();
  $("#color").click(function(){
    $("#color_load").show()
    var activity = $(this).data("activity"),
    color = $("#modal_color_input").val()
    msn = $("#modal_msn").val(),
    input_file =  $('input[type=file]')[0].files[0]
    var formData = new FormData()
    formData.append("color", color)
    formData.append("msn", msn)
    formData.append("file", input_file)
    $.ajax({
      url: '/createColor/'+activity,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(res){
        console.log(res)
        $("#colorModalCenter").hide()
      },
      error: function(res){
        alert(res)
        console.log(res)
        $("#colorModalCenter").hide()
      }
    })
  })
})