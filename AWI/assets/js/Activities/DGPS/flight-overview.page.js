$(document).ready(function() {
    $("table[id^='subtable_']").DataTable({
        paging: false,
    })
    $('button[data-id="see_par"]').each(function(){
        $(this).on('click', function(evt){
            var row = $(this).parents('tr')[0]
            // TODO Create labels from row via ajx call
            // Show Modal Here
            var data = []
            // Ignore Last Columns (Actions)
            for(var i=0; i<row.cells.length-1; i++){
                data.push(row.cells[i].innerHTML)
            }
            alert(data)
            return
            var url = `${window.url}/plot`
            $.ajax({
                url: url,
                data:{
                    row: row
                },
                type: "GET",
                success: createPlot(data),
                error: function(){
                    alert("Fetching Data Failed")
                }
            })

        })
    })


var createPlot =  function(data){
    var ctx = document.getElementById("canvas").getContext("2d")
    window.chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            responsive: true,
            title: { 
                display: true,
                text: title
            },
            tooltips: {
                mode: "index",
                intersect: true,
            },
            annotations: {
                events: ["click"],
                annotations: []
            }
        }
    })
    // Show Modal
}


})