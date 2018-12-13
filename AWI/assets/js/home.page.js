$(document).ready(function () {
    $("#start").click(function () {
        var activity = $("#selected").val();
        if(activity !== null){
        var url = '/Activities/'+activity+'/flights';
        window.location.href = url;}
        else {
            console.log('Please pick an activity')
        }
    })
});