$(function() {
    var clockType = 'digital';
    clockView.render(clockType);

    $( ".clock__switcher" ).change(function() {
        


        clockView.render();
    });

});
