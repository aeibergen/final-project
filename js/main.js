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
        minZoom: 2,
        maxZoom: 6,
    });

    //create the layers to make the maps
    L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
       maxZoom: 19,
	     attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>; <a href="http://biodiversitymapping.org/wordpress/index.php/home/">Biodiversity Mapping</a>'
	  }).addTo(map);

    (function() {
      var control = new L.Control({position:'topleft'});
      control.onAdd = function(map) {
          var azoom = L.DomUtil.create('a','resetzoom');
          azoom.innerHTML = "[Reset Zoom]";
          L.DomEvent
            .disableClickPropagation(azoom)
            .addListener(azoom, 'click', function() {
              map.setView(map.options.center, map.options.zoom);
            },azoom);
          return azoom;
        };
      return control;
    }())
    .addTo(map);

//call getData function
getData(map);

var geojson;

    //function to retrieve map data
    function getData(map){

      //load the data
      $.ajax("data/hotspotInfo.geojson", {
        dataType: "json",
        success: function(response){

    //create a leaflet GeoJSON layer and add it to the map
    geojson = L.geoJson(response, {
      style: function (feature){
        if(feature.properties.TYPE === 'hotspot_area'){
          return {color: '#3182bd',
                  weight: 2,
                  stroke:1};
        } else if(feature.properties.TYPE ==='outer_limit'){
          return {color: '#9ecae1',
                  weight: 2,
                  stroke: 0,
                  fillOpacity: .5};
        }
      },


      onEachFeature: function (feature,layer) {
        var popupContent = "";
        if (feature.properties) {
          //loop to add feature property names and values to html string
          popupContent += "<h5>" + "Region" + ": " + feature.properties.NAME + "</h5>";

          if (feature.properties.TYPE ==="hotspot_area"){

          popupContent += "<h5>" + "Type: " + "Hotspot" + "</h5>";

          }


          if (feature.properties.TYPE ==="outer_limit"){

          popupContent += "<h5>" + "Type: " + "Hotspot Outer Limit" + "</h5>";

          }


          layer.bindPopup(popupContent);

          };


          layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
          });
          layer.on({
          click: panelInfo,
          })
        }
    }).addTo(map);

    //load in all the biodiversity and threatened species image overlays
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

    var threatenedaUrl = 'img/threatened_amp.png',
        threatenedaBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var threateneda = L.imageOverlay(threatenedaUrl, threatenedaBounds);

    var birdsUrl ='img/birds.png',
        birdsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var birds = L.imageOverlay(birdsUrl, birdsBounds);

    var psittaciformesUrl = 'img/psittaciformes_richness.png',
        psittaciformesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var psittaciformes = L.imageOverlay(psittaciformesUrl, psittaciformesBounds);

    var passeriformesUrl = 'img/passeriformes_richness.png',
    	   passeriformesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var passeriformes = L.imageOverlay(passeriformesUrl, passeriformesBounds)

    var nonpasseriformesUrl = 'img/nonPasseriformes.png',
        nonpasseriformesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var nonpasseriformes = L.imageOverlay(nonpasseriformesUrl, nonpasseriformesBounds)

    var hummingbirdsUrl = 'img/hummingbirds.png',
        hummingbirdsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var hummingbirds = L.imageOverlay(hummingbirdsUrl, hummingbirdsBounds)

    var songbirdsUrl = 'img/songbirds_richness.png',
    	songbirdsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var songbirds = L.imageOverlay(songbirdsUrl, songbirdsBounds);

    var threatenedbUrl = 'img/threatened_birds.png',
      threatenedbBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var threatenedb = L.imageOverlay(threatenedbUrl, threatenedbBounds);

    var mammalsUrl = 'img/mammals.png',
        mammalsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var mammals = L.imageOverlay(mammalsUrl, mammalsBounds);

    var carnivoraUrl = 'img/carnivora.png',
        carnivoraBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var carnivora = L.imageOverlay(carnivoraUrl, carnivoraBounds);

    var cetartiodactylaUrl = 'img/cetartiodactyla.png',
        cetartiodactylaBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var cetartiodactyla = L.imageOverlay(cetartiodactylaUrl, cetartiodactylaBounds);

    var chiropteraUrl = 'img/chiroptera_bats.png',
        chiropteraBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var chiroptera = L.imageOverlay(chiropteraUrl, chiropteraBounds);

    var eulipotyphlaUrl = 'img/eulipotyphla.png',
        eulipotyphlaBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var eulipotyphla = L.imageOverlay(eulipotyphlaUrl, eulipotyphlaBounds);

    var marsupialsUrl = 'img/marsupials.png',
        marsupialsBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var marsupials = L.imageOverlay(marsupialsUrl, marsupialsBounds);

    var primatesUrl = 'img/primates.png',
        primatesBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var primates = L.imageOverlay(primatesUrl, primatesBounds);

    var rodentiaUrl = 'img/rodentia.png',
        rodentiaBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var rodentia = L.imageOverlay(rodentiaUrl, rodentiaBounds);

    var threatenedmUrl = 'img/threatened_mammals.png',
        threatenedmBounds = [[84.65, -220.9],[-62.24, 220.85]];
    var threatenedm = L.imageOverlay(threatenedmUrl, threatenedmBounds);

    //define structure of layers and overlays
    var animals = [
      {
        groupName: "Amphibians",
        expanded: true,
        layers: {
          "All Amphibians": amphibians,
        	"Caecilian": caecilians,
        	"Anura": anura,
        	"Caudata": caudata
        }
      }, {
        groupName: "Birds",
        expanded: true,
        layers: {
          "Birds": birds,
        	"Psittaciformes": psittaciformes,
        	"Passeriformes": passeriformes,
          "NonPasseriformes": nonpasseriformes,
          "Trochilidae": hummingbirds,
        	"Passeri": songbirds
        }
      }, {
        groupName: "Mammals",
        expanded: true,
        layers: {
          "All Mammals": mammals,
          "Carnivora": carnivora,
          "Cetartiodactyla": cetartiodactyla,
          "Chiroptera": chiroptera,
          "Eulipotyphla": eulipotyphla,
          "Marsupials": marsupials,
          "Primates": primates,
          "Rodentia": rodentia
        }
      }, {
        groupName: "Threatened Species",
        expanded: true,
        layers: {
          "Threatened Amphibians": threateneda,
          "Threatened Birds": threatenedb,
          "Threatened Mammals": threatenedm
        }
      }
    ];

    var overlay = [
      {
        groupName: "Overlay",
        expanded: true,
        layers: {
          "Hotspots": geojson
        }
      }
    ];

    //style the controls
    var options = {
      group_maxHeight: "200px",
      exclusive: false,
      collapsed: false
    }

    //add heat maps and hotspot overlay to map
    var control = L.Control.styledLayerControl(animals, overlay, options);
         control._map = map;
     var controlDiv = control.onAdd(map);

    document.getElementById('controls').appendChild(controlDiv);

  

}
});



};

function panelInfo (e) {
  var layer = e.target;
  // "<p><b>City:</b> " + feature.properties.City + "</p>"
  var panelContent = "<h4><b>Hotspot Name:</b> " + "<a href='" + layer.feature.properties.LINK + "' target ='_blank'>" + layer.feature.properties.NAME + "</a>" + "</h4>";

  panelContent += "<h4><b>Original Area (km<sup>2</sup>):</b> " + layer.feature.properties.ORIGINAL + "</h4>";

  panelContent += "<h4><b>Remaining Area (km<sup>2</sup>):</b> " + layer.feature.properties.REMAINING + "</h4>";

  panelContent += "<h4><b>Number of Plant Species:</b> " + layer.feature.properties.PLANTS + "</h4>";

  panelContent += "<h4><b>Mammal Species:</b> " + layer.feature.properties.MAMMALS + "</h4>";

  panelContent += "<h4><b>Bird Species:</b> " + layer.feature.properties.BIRDS + "</h4>";

  panelContent += "<h4><b>Amphibian Species:</b> " + layer.feature.properties.AMPHIBIANS + "</h4>";

  panelContent += "<h4><b>Threats to Biodiversity:</b> " + layer.feature.properties.THREATS + "</h4>";

  var picture = "<img src =" + layer.feature.properties.PIC1 + ">";

  panelContent += picture;

  $("#panelright").html(panelContent);

};

function highlightFeature(e) {

  var layer = e.target;
  if (layer.feature.properties.TYPE ==="hotspot_area"){
  layer.setStyle({
        weight: 5,
        stroke: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7

  });
};

if (layer.feature.properties.TYPE ==="outer_limit"){
layer.setStyle({
      weight: 5,
      stroke: 0,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7

});
};

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
