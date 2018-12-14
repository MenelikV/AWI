$(document).ready(function () {
    $("#start").click(function () {
        
        var activity = $("#selected").val();
        if (activity.length) {
            $("#check").hide();
            $("#spin").show();
            var url = '/Activities/' + activity + '/flights';
            window.location.href = url;
        }
        else {
            console.log('Please pick an activity')
        }
    })
})