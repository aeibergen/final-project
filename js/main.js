//Creators: Andrea, Ben, and Sulong
//Final Project
//4-18-2017

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
};