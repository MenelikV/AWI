$(document).ready(function () {
  
  $.fn.dataTable.moment("DD/MM/YYYY HH:mm");

  $('#aircrafts-anemo').DataTable({
    "order":[[5, "desc"]]
  });
  $('.dataTables_length').addClass('bs-select');

  $("#aircrafts-anemo tbody").on("click", "tr", function (event) {
    var currentRow = $(this).closest("tr");
    var info = currentRow.find("td").eq(3).text().replace(/\s/g, '');
    window.location.href = '/Activities/ANEMO/flightOverview/' + info;
  });
}); 