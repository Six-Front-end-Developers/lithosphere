var vueInstance;

$(document).ready(function() {
    $(function(){
        $('#world-map').vectorMap({map: 'world_mill'});
    });

    vueInstance = new Vue({
        el: '#example',
        data: { hello: 'Hello World!' }
    })
})