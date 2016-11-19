/**
 * Created by Puska on 30. 10. 2016.
 */
function responsiveNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function initMap() {
    var uluru = {lat: 46.0552778, lng: 14.5144444};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

window.onload = function() {
    initMap();
};