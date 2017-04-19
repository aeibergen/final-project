//Creators: Andrea, Ben, and Sulong
//Final Project
//4-18-2017


//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

 //call getData function
    getData(map);
};

//function to retrieve the data and place it on the map
function getData(map){
    //load the data
    $.ajax("data/hotspotData.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);
        }
    });
};

$(document).ready(createMap);
