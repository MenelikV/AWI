$(document).ready(function(){
    if($("#cor_slat_flap").length){
        var slat = $("#SLAT").data("slat"),
        flap = $("#FLAP").data("flap"),
        prog = $("#cor_slat_flap").data("prog")
        flapi = $("#FLAP").data("flapi"),
        flapol = $("#FLAP").data("flapol"),
        flapor = $("#FLAP").data("flapor");
        // Suppose flap & slat are strings
        // What to do when flap in not available anymore ? Ask Audrey :/
        if(slat & flap & prog.length > 0){
            console.log(`th:contains("${prog}")`)
            table_index = $(`td:contains("${prog}")`).index()+1
            $("#cor_slat_flap tr td:nth-child("+table_index+')').each(function(){
                content = $(this)[0].textContent
                if(Math.abs(parseInt(content.substring(0, 2)) - Math.round(parseFloat(slat))) < 2 & Math.abs(parseInt(content.substring(2, 4)) - Math.round(parseFloat(flap))) < 2){
                    $(this).css("background-color", "green")
                }
            })
        }
        else{
            // TODO, Wait for Audrey Input
        }
    }
})