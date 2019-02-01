$(document).ready(function () {
  $('#aircrafts-anemo').DataTable();
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-anemo tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    window.location.href = '/Activities/ANEMO/flightOverview/' + info;
  });
}); 