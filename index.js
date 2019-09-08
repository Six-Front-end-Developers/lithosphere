var vueInstance;

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

    $.ajax({
        type: "GET",
        url: "http://localhost:8000/earthquakes",
        dataType: 'json',
        success: function(earthquakes){
          console.log(earthquakes);
        },
        error: function( xhr, status, errorThrown ) {
          /* Temp, for debugging. Remove/alter before push to production. */
          alert( "Something went wrong! Check the console for logs." );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        }
      })

})