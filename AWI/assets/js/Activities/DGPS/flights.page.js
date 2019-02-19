$(document).ready(function () {
  $('#aircrafts-dgps').DataTable({
    "order":[[0, "desc"]]
  });
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-dgps tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    window.location.href = '/Activities/DGPS/flightOverview/' + info;
  });
});