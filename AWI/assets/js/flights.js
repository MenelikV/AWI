$(document).ready(function() {
    $( "#aircrafts tbody tr" ).on( "click", function( event ) {
        var currentRow=$(this).closest("tr");
        var aircraft = currentRow.find("td").eq(0).text().replace(/\s/g, '');
        var msn = currentRow.find("td").eq(1).text().replace(/\s/g, '');
        var info = aircraft+msn
        window.location.href = '/flightOverview/'+info; 
    });
});