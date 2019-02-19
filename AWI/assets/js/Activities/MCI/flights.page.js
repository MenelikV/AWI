$(document).ready(function () {
  $('#aircrafts-mci').DataTable({
    "order":[[0, "desc"]]
  });
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-mci tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    window.location.href = '/Activities/MCI/flightOverview/' + info;
  });
})