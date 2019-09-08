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

var earthquakeList = []
var filteredList = []

function filterEarthquakesForDate(fromDate, toDate, earthquakes) {
  filteredList = filteredList.filter((eq) => {
    return fromDate <= eq.time <= toDate
  })
}

function filterEarthquakesForMagnitude(from, to, earthquakes) {
  var i = 0
  filteredList = filteredList.filter((eq) => {
    if (eq.mag >= from && eq.mag <= to) i++
    console.log(`EQMAG: ${eq.mag}, FROM: ${from}, TO: ${to}, true: ${eq.mag >= from && eq.mag <= to}`)
    return eq.mag >= from && eq.mag <= to
  })
  console.log(filteredList)
}


$(document).ready(function() {
    $('#datepicker-from').datepicker({
        defaultDate: new Date("01/01/2019"),
      onSelect: function () {
        var newFromDate = $('#datepicker-from').datepicker('getDate');
        var toDate = $('#datepicker-to').datepicker('getDate');
        console.log(newFromDate)
        console.log(toDate)
        updateFilterForDate(newFromDate.getTime(), toDate.getTime())
        loadEarthquakes(filteredList)
      }
    });
    $('#datepicker-to').datepicker({
        defaultDate: new Date("09/07/2019"),
        onSelect: function (newToDate) {
          var fromDate = $('#datepicker-from').datepicker('getDate');
          var newToDate = $('#datepicker-to').datepicker('getDate');
          console.log(fromDate)
          console.log(newToDate)
          updateFilterForDate(fromDate.getTime(), newToDate.getTime())
          loadEarthquakes(filteredList)
      }
    });
    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 9,
      max: 10,
      step: 0.1,
      onFinish: function (slider) {
        console.log(slider.from)
        console.log(slider.to)
        updateFilterForMagnitude(slider.from, slider.to)
        loadEarthquakes(filteredList)
      }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/earthquakes",
        dataType: 'json',
        success: function(earthquakes){
            earthquakeList = earthquakes
            filteredList = earthquakes
            // Set earthquakes, then filter
            var fromDate = $('#datepicker-from').datepicker('getDate');
            var toDate = $('#datepicker-to').datepicker('getDate');
            console.log(fromDate)
            console.log(toDate)
            var slider = $(".js-range-slider").data("ionRangeSlider").result;
            var x = filterEarthquakesForMagnitude(slider.from, slider.to)
            console.log(fromDate.getTime())
            filterEarthquakesForDate(fromDate.getTime(), toDate.getTime())

            console.log(earthquakes);
            console.log(filteredList)
            loadEarthquakes(filteredList);
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

function updateFilterForMagnitude(from, to) {
  filteredList = earthquakeList.slice()
  var fromDate = $('#datepicker-from').datepicker('getDate');
  var toDate = $('#datepicker-to').datepicker('getDate');
  filterEarthquakesForDate(fromDate.getTime(), toDate.getTime())
  filterEarthquakesForMagnitude(from, to)
}

function updateFilterForDate(fromDate, toDate) {
  filteredList = earthquakeList.slice()
  filterEarthquakesForDate(fromDate, toDate)
  var slider = $(".js-range-slider").data("ionRangeSlider").result;
  filterEarthquakesForMagnitude(slider.from, slider.to)
}

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
