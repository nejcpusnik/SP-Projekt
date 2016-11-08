function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

var myNav = document.getElementById('myTopnav');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 1 ) {
        myNav.classList.add("topnav");
        myNav.classList.remove("topnav-transparent");
    } 
    else {
        myNav.classList.add("topnav-transparent");
        myNav.classList.remove("topnav");
    }
};

