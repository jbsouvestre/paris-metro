var fs = require('fs');
var url = 'http://api.openstreetmap.fr/oapi/interpreter?data=[out:json];node[%22type:RATP%22~%22metro|rer|tram%22];out;way[%22type:RATP%22~%22metro|rer|tram%22];out;%3E;out%20skel;';
var ratp = require('./ratp.json');

var elements = ratp.elements;

var stations = [];



function getMetroStations(els) {
    els.forEach(function(el) {
        if(el.tags && el.tags["type:RATP"] === "metro") {
            stations.push(el);
        }
    });
};

getMetroStations(elements);

fs.writeFileSync('metro.json', JSON.stringify(stations, null, 4), 'utf-8'/**/);