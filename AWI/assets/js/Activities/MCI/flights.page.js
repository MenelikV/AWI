$(document).ready(function () {
  $('#aircrafts-mci').DataTable();
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-mci tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    $("#spinnerModal").modal("show")
    window.location.href = '/Activities/MCI/flightOverview/' + info;
  });
})