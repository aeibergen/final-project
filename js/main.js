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
     L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

    //create option to have no biodiversity overlay 
    var noneUrl = 'img/.jpg',
    	noneBounds = [];
   	var none = L.imageOverlay(noneUrl, noneBounds);

   	var amphibianUrl = 'img/amphibian_richness_10km_all.png',
    	amphibianBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var amphibians = L.imageOverlay(amphibianUrl, amphibianBounds);

    var caecilianUrl = 'img/caecilian_richness_10km.png',
    	caecilianBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var caecilians = L.imageOverlay(caecilianUrl, caecilianBounds);

    var anuraUrl = 'img/frog_richness_10km.png',
    	anuraBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var anura = L.imageOverlay(anuraUrl, anuraBounds);

    var caudataUrl = 'img/salamander_richness_10km.png',
    	caudataBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var caudata = L.imageOverlay(caudataUrl, caudataBounds);

    var psittaciformesUrl = 'img/psittaciformes_richness.png',
        psittaciformesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var psittaciformes = L.imageOverlay(psittaciformesUrl, psittaciformesBounds);

    var passeriformesUrl = 'img/passeriformes_richness.png',
    	passeriformesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var passeriformes = L.imageOverlay(passeriformesUrl, passeriformesBounds)

    var songbirdsUrl = 'img/songbirds_richness.png',
    	songbirdsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var songbirds = L.imageOverlay(songbirdsUrl, songbirdsBounds);


    //category names for toggle layers
    var animals = {
    	"Overlays Off": none,
    	"All Amphibians": amphibians,
    	"Caecilian": caecilians,
    	"Anura": anura,
    	"Caudata": caudata,
    	"Psittaciformes": psittaciformes,
    	"Passeriformes": passeriformes,
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
