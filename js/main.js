//Creators: Andrea, Ben, and Sulong
//Final Project
//4-18-2017


//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var map = L.map('mapid', {
        center: [20, 0],
        zoom: 2,
        maxZoom:2
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

 //call getData function
    getData(map);


var geojson;

//function to retrieve the data and place it on the map
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
                    click: zoomToFeature, 
                    click: panelInfo
                });

               


            }


            }).addTo(map);

            
           var overlay  = {
                "Hotspots" : geojson
            };

            L.control.layers(null, overlay).addTo(map);

           

            
           
        }
    });
};


function panelInfo (e) {
    var layer = e.target;
    
    $("#panel").html(layer.feature.properties.NAME);

}


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
