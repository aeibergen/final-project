//Creators: Andrea, Ben, and Sulong
//Final Project
//4-18-2017


//function to instantiate the Leaflet map
function createMap(){

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

    //create the layers to make the maps
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //create option to 
    // var noneUrl = 'img/.jpg',
    // 	noneBounds = [];

   	// var none = L.imageOverlay(noneUrl, noneBounds);

    var psittaciformesUrl = 'img/psittaciformes_richness.png',
        psittaciformesBounds = [[84.65, -220.9],[-62.24, 220.85]];

    var psittaciformes = L.imageOverlay(psittaciformesUrl, psittaciformesBounds);

    // var amphibianUrl = 'img/amphibian_richness_10km_all.jpg',
    // 	amphibianBounds = [[76, -180],[-60, 180]];

    // var amphibians = L.imageOverlay(amphibianUrl, amphibianBounds);

    var songbirdsUrl = 'img/songbirds_richness.png',
    	songbirdsBounds = [[84.65, -220.9],[-62.24, 220.85]];

    var songbirds = L.imageOverlay(songbirdsUrl, songbirdsBounds);


    //category names for toggle layers
    var animals = {
    	// "None": none,
    	"Psittaciformes": psittaciformes,
    	// "All Amphibians": amphibians,
    	"Songbirds": songbirds
    };

    //  //call getData function
    // var overlayMaps = {
    // 	"Hotspots": getData(map)
    // };

    //add animals raster information to map
    L.control.layers(animals).addTo(map);
};


// //function to retrieve the data and place it on the map
// function getData(map){
//     //load the data
//     $.ajax("data/hotspotData.geojson", {
//         dataType: "json",
//         success: function(response){

//             //create a Leaflet GeoJSON layer and add it to the map
//             L.geoJson(response).addTo(map);
//         }
//     });
// };

$(document).ready(createMap);
