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

function loadEarthquakes(earthquakes) {
    someMarkers = []
    for (var eq of earthquakes) {
        someMarkers.push({
            latLng: [eq.latitude, eq.longitude],
            name: eq.place,
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
        markers: someMarkers,
        onMarkerTipShow: function(event,label,index){
            var markers = $('#world-map').vectorMap('get', 'mapObject').markers;
            let current = markers[index].config
            label.html(
                '<b>'+current.mag +'</b><br/>'+ current.latLng +'</br>'
            );
        }
    });
    
}
