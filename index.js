var vueInstance

$(document).ready(function() {
    let exampleCoord = [[38.30,142.40],'Tokyo, Magnitude: 9, Date: 2011'];
    let exampleCoord2 = [[50,100.40],'Tokyo, Magnitude: 9, Date: 2011'];
    $(function(){
        $('#world-map').vectorMap({map: 'world_mill',
        markerStyle: {
            initial: {
                fill: '#f52222',
                stroke: '#2e2e2e'
            }
        },
        markers: [
            {latLng: exampleCoord[0], name: exampleCoord[1]},
            {latLng: exampleCoord2[0], name: exampleCoord2[1], style: {fill: '#344533'}},
            
        ]
    });
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