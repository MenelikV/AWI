$(document).ready(function () {
  var dt = $("#filters-table").DataTable();
  $('tbody').on('click', '#delete', function () {
    $(this).closest("tr").addClass('selected');
    var row = $("#filters-table tr.selected");
    var id = $(this).closest("tr").attr('id');
    $.ajax({
      url: '/deleteFilter/' + id,
      type: 'POST',
      success: function success() {
        dt.row(row).remove().draw(true);
      }
    }) 
  })
})
