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

});


//create the layers to make the maps

L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {

maxZoom: 19,

attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>; <a href="http://biodiversitymapping.org/wordpress/index.php/home/">Biodiversity Mapping</a>'

}).addTo(map);



//call getData function

getData(map);



var geojson;


//function to retreve data

function getData(map){

//load the data

$.ajax("data/hotspotData.geojson", {

dataType: "json",

success: function(response){


//create a Leaflet GeoJSON layer and add it to the map

geojson = L.geoJson(response, {


style: function (feature) {

if(feature.properties.TYPE === 'hotspot_area'){

return {color: '#de2d26' ,

weight: 2,

stroke: 1};

} else if(feature.properties.TYPE === 'outer_limit'){

return { color: '#fc9272',

weight: 2,

stroke: 0,

fillOpacity: .5 };

}

},


onEachFeature: function (feature, layer) {

var popupContent = "";

if (feature.properties) {

//loop to add feature property names and values to html string


popupContent += "<p>" + "Region" + ": " + feature.properties.NAME + "</p>";

if (feature.properties.TYPE ==="hotspot_area"){

popupContent += "<p>" + "Type: " + "Hotspot" + "</p>";

}


if (feature.properties.TYPE ==="outer_limit"){

popupContent += "<p>" + "Type: " + "Hotspot Outer Limit" + "</p>";

}


layer.bindPopup(popupContent);

};


layer.on({

mouseover: highlightFeature,

mouseout: resetHighlight,

click: panelInfo,

click: zoomToFeature

});





}



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


//

var overlay = {

"Hotspots" : geojson

};


//add heatmaps and hotspot to map

L.control.layers(animals, overlay).addTo(map);


}

});

};



function panelInfo (e) {

var layer = e.target;


$("#panel").html(layer.feature.properties.NAME);


};



function highlightFeature(e) {

var layer = e.target;


layer.setStyle({

weight: 5,

stroke: 1,

color: '#666',

dashArray: '',

fillOpacity: 0.7

});


if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {

layer.bringToFront();

}

};


function resetHighlight(e) {

var layer = e.target;

geojson.resetStyle(e.target);


layer.closePopup();

};


function zoomToFeature(e) {

map.fitBounds(e.target.getBounds());

};


};



$(document).ready(createMap);
