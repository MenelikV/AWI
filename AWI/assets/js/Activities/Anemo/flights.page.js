$(document).ready(function () {
  $('#aircrafts-anemo').DataTable({
    "order":[[5, "asc"]]
  });
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-anemo tbody").on("click", "tr", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    window.location.href = '/Activities/ANEMO/flightOverview/' + info;
  });
}); 