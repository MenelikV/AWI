$(document).ready(function(){
  // Create the Colorpicker
  picker = $("#modal_color").colorpicker();
  /*
   * Modal Color Logic 
   */ 
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
    formData.append('activity', activity)
    $.ajax({
      url: '/createColor/'+activity,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(res){
        console.log(res)
        $("#colorModalCenter").modal("hide")
      },
      error: function(res){
        alert(res)
        console.log(res)
        $("#colorModalCenter").modal("hide")
      }
    })
  })
  /*
   * DataTable and delete logic 
   */
  var dt = $("#colors-table").DataTable();
  $('tbody').on('click', '#delete-color', function () {
    $(this).closest("tr").addClass('selected');
    var row = $("#colors-table tr.selected");
    var id = $(this).closest("tr").attr('id');
    $.ajax({
      url: '/deleteColor/' + id,
      type: 'POST',
      success: function success() {
        dt.row(row).remove().draw(true);
      }
    }) 
  })
})