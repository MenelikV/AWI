$(document).ready(function(){
    $('#spinnerModal').modal("hide")
    $(window).on("beforeunload", function(){
        $("#spinnerModal").modal("show")
    })
})