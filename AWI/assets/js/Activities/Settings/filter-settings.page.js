$(document).ready(function () {
  $("#filters-table").DataTable();
  $('tbody').on('click', '#delete', function () {
    var id = $(this).closest("tr").attr('id');
    $.ajax({
        url: '/Filter/delete/'+id,
        type: 'POST',
        success: function success(){
          $("#"+id).remove()
        }
    })
  })
}) 
