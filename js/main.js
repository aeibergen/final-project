//Creators: Andrea, Ben, and Sulong
//Final Project
//4-18-2017


//function to instantiate the Leaflet map
function createMap(){

    //create the layers to make the maps
    var base = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    //     amphibians = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });
        imageUrl = 'img/amphibian_richness_10km_all.jpg',
        imageBounds = [[76, -180],[-60, 180]];

    //create the map
    var map = L.map('mapid', {
        center: [20, 0],
        zoom: 2,
        maxBounds:[
          [70, 176],
          [-48, -130]
        ],
        // layers: [base, amphibians]
    });

    // var baseMaps = {
    //   "Base": base,
    //   "All Amphibians": amphibians
    // };

    // L.control.layers(baseMaps).addTo(map);
    L.imageOverlay(imageUrl, imageBounds).addTo(map);

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
