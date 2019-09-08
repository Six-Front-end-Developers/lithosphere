var vueInstance

$(document).ready(function() {
    $(function(){
        $('#world-map').vectorMap({map: 'world_mill'});
        $('#datepicker-from').datepicker();
        $('#datepicker-to').datepicker();
        $(".js-range-slider").ionRangeSlider({
            type: "double",
            min: 5,
            max: 10,
            step: 0.1
        });
    });

    vueInstance = new Vue({
        el: '#example',
        data: { hello: 'Hello World!' }
    })

})