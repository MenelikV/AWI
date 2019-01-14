$(document).ready(function () {
  $('#aircrafts-mci').DataTable();
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-mci tbody tr").on("click", function (event) {
    var currentRow = $(this).closest("tr");
    var aircraft = currentRow.find("td").eq(1).text().replace(/\s/g, '');
    var msn = currentRow.find("td").eq(2).text().replace(/\s/g, '');
    var info = aircraft + msn
    $("#spinnerModal").modal("show")
    window.location.href = '/Activities/MCI/flightOverview/' + info;
  });
})