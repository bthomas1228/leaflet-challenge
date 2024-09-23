// Create our initial map object.
// Set the longitude, latitude, and starting zoom level to show a map of the US.
let myMap = L.map("map").setView([39.8283, -98.5795], 5);


// Add a tile layer (the background map image) to our map.
// Use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

console.log("US map created")

// Create a red circle over Dallas as a test.
L.circle([32.7767, -96.7979], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.75,
    radius: 10000
  }).addTo(myMap);

  console.log("create circle")

let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

  console.log("link")

   // Function to determine marker size based on magnitude
   
   function markerSize(magnitude) {
        return magnitude * 5; 
}

// Function to determine marker color based on depth
    function getColor(depth) {
        return depth > 100 ? '#FF0000' : // red for depth > 100
               depth > 50  ? '#FF7F00' : // orange for depth > 50
               depth > 20  ? '#FFFF00' : // yellow for depth > 20
                             '#00FF00'; // green for depth <= 20
}

// Load earthquake data 
d3.json(link).then(function(data) {
     
    createFeatures(data.features);
});
            
    // Create a circle marker for each earthquake
      
    function createMarker (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: markerSize(feature.properties.mag),
            fillColor: getColor(feature.properties.coordinates[2]),
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8

                    
        }).addTo(myMap);
    }

        L.geoJSON(data, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    }).addTo(myMap);

