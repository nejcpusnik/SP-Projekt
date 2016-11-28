/**
 * Created by Puska on 30. 10. 2016.
 */


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var ljubljana = {lat: 46.056946, lng: 14.505751};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: ljubljana
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    var input = document.getElementById('pac-input');
    var input2 = document.getElementById('pac-input2');
    var searchBox = new google.maps.places.SearchBox(input);
    var searchBox2 = new google.maps.places.SearchBox(input2);
    map.controls[google.maps.ControlPosition.LEFT].push(input);
    map.controls[google.maps.ControlPosition.LEFT].push(input2);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
        searchBox2.setBounds(map.getBounds());
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true
            });
        }
    }

    directionsService.route({
        origin: document.getElementById('pac-input').value,
        destination: document.getElementById('pac-input2').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            var routeinfo = document.getElementById('routeinfo');
            routeinfo.innerHTML = 'Route Information:<br>';
            summaryPanel.innerHTML = '';
            summaryPanel.className="directions-panel";
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        }
        else if(status == 'NOT_FOUND'){
            window.alert('INVALID STARTING OR ENDING DESTINATION.');
        }
        else if(status == 'ZERO_RESULTS'){
            window.alert('SPECIFIED ADDRESS WAS NOT FOUND.');
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function enterMap(){
    var url = window.location.href;
    url = url.split("html?");
    url = url[1].split("&");
    var startdest = url[0].split("=");
    var enddest = url[1].split("=");
    document.getElementById('pac-input').value = startdest[1];
    document.getElementById('pac-input2').value = enddest[1];
}