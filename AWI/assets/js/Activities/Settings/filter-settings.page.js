$(document).ready(function () {
  $("#filters-table").DataTable();
  $('tbody').on('click', '#delete', function () {
    var filterID = $(this).closest("tr").attr('id');
    $.ajax({
        url: '/Filter/delete/'+filterID,
        type: 'POST',
        success: function success(){
            $("#"+filterID).remove()
        }
    })
  })
})
