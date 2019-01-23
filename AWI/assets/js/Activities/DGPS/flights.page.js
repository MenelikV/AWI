$(document).ready(function () {
  $('#aircrafts-dgps').DataTable();
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-dgps tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var aircraft = currentRow.find("td").eq(1).text().replace(/\s/g, '');
    var test = currentRow.find("td").eq(2).text().replace(/\s/g, '');
    var info = aircraft + '_' + test
    window.location.href = '/Activities/DGPS/flightOverview/' + info;
  });
});