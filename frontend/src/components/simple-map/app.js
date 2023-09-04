
// Initialize the map
var myMap = L.map('map').setView([9, 38.7382], 12);

// Add an OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


var routeCoordinates = []
var markers = []
var route = L.polyline(routeCoordinates, { color: 'blue' }).addTo(myMap)
myMap.on('click', function(event) {
    // Extract latitude and longitude from the click event
    var lat = event.latlng.lat;
    var lng = event.latlng.lng;

    console.log(event.latlng)
    if(routeCoordinates.length === 0) {
        markers.forEach((marker) => myMap.removeLayer(marker))
        myMap.removeLayer(route)  
    }
    markers.push(L.marker([lat, lng]).addTo(myMap));
    routeCoordinates.push([lat, lng])
    if(routeCoordinates.length === 2) {
        route = L.polyline(routeCoordinates, { color: 'blue' }).addTo(myMap);
        routeCoordinates = []
    }
});
