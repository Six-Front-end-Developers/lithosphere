var vueInstance;
class Earthquake {
    constructor(mag, place, time, tz, lat, lon, depth) {
        this.mag = mag
        this.place = place
        this.time = time
        this.tz = tz
        this.lat = lat
        this.lon = lon
        this.depth = depth
    }
}

$(document).ready(function() {
    let EQs = [new Earthquake(6,6,6,6,6,6,6),new Earthquake(7,7,7,7,7,7,7)];
    let exampleCoord = [[38.30,142.40],'Tokyo, Magnitude: 9, Date: 2011'];
    let exampleCoord2 = [[50,100.40],'Tokyo, Magnitude: 9, Date: 2011'];
    $(function(){
        $('#world-map').vectorMap({
        map: 'world_mill',
        markerStyle: {
            initial: {
                fill: '#f52222',
                stroke: '#2e2e2e'
            }
        },
        markers: [
            {latLng: exampleCoord[0], name: exampleCoord[1], Magnitude: new Earthquake(6,6,6,6,6,6,6)},
            {latLng: exampleCoord2[0], name: exampleCoord2[1], style: {fill: '#344533'}},
            
        ],
        onMarkerTipShow: function(event,label,index){
            var markers = $('#world-map').vectorMap('get', 'mapObject').markers;
            label.html(
                '<b>'+markers[index].config.Magnitude.mag +'</b><br/>'+exampleCoord2[1]+'</br>'
            );
        }
    });
        $('#datepicker-from').datepicker({
            defaultDate: new Date("01/01/2000")
        });
        $('#datepicker-to').datepicker({
            defaultDate: new Date("09/07/2019")
        });

        $(".js-range-slider").ionRangeSlider({
            type: "double",
            min: 5,
            max: 10,
            step: 0.1
        });

    vueInstance = new Vue({
        el: '#example',
        data: { hello: 'Hello World!' }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/earthquakes",
        dataType: 'json',
        success: function(earthquakes){
            console.log(earthquakes);
            loadEarthquakes(earthquakes);
        },
        error: function( xhr, status, errorThrown ) {
            /* Temp, for debugging. Remove/alter before push to production. */
            alert( "Something went wrong! Check the console for logs." );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        }
    })

    $('#toggle-options').click(function() {
        toggleOptions();
    })

    $('#overlay').click(function() {
        toggleOptions();
    })

})

function toggleOptions() {
    $('#options').toggle();
    $('#overlay').toggle();
}
})

function loadEarthquakes(earthquakes) {
    someMarkers = []
    for (eq in earthquakes) {
        someMarkers.push({
            latLng: [eq.lat, eq.log],
            name: eq.name,
            mag: eq.mag
        })
    }

    $('#world-map').vectorMap({
        map: 'world_mill',
        markerStyle: {
            initial: {
                fill: '#f52222',
                stroke: '#2e2e2e'
            }
        },
        markers: [
            
            {latLng: exampleCoord[0], name: exampleCoord[1], Magnitude: new Earthquake(6,6,6,6,6,6,6)},
            {latLng: exampleCoord2[0], name: exampleCoord2[1], style: {fill: '#344533'}},
            
        ],
        onMarkerTipShow: function(event,label,index){
            var markers = $('#world-map').vectorMap('get', 'mapObject').markers;
            let current = markers[index].config
            label.html(
                '<b>'+current.mag +'</b><br/>'+ current.latLng +'</br>'
            );
        }
    });
    
}
