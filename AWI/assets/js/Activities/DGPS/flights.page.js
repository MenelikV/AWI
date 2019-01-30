$(document).ready(function () {
  $('#aircrafts-dgps').DataTable();
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-dgps tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    $("#spinnerModal").modal("show")
    window.location.href = '/Activities/DGPS/flightOverview/' + info;
  });
});