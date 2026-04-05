// Remove 'let mapToken = mapToken;'
if (!mapToken) {
  console.error("Mapbox token is missing!");
}

// mapboxgl.accessToken = mapToken; // Use the exact same casing: mapToken

// const map = new mapboxgl.Map({
//   container: 'map', 
//   style: 'mapbox://styles/mapbox/streets-v12', 
//   center: [coordinates.geometry.coordinates[0], coordinates.geometry.coordinates[1]], // Default center
//   zoom: 9 
// });



// new mapboxgl.Marker({ color: "red" })
//   .setLngLat([coordinates.geometry.coordinates[0], coordinates.geometry.coordinates[1]])
//   .addTo(map);

    mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // ID of the div in show.ejs
    style: 'mapbox://styles/mapbox/streets-v12', 
    center: coordinates, // Use the array directly: [longitude, latitude]
    zoom: 9 
});

// Add a marker to the location
new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML("<h3>Exact location provided after booking</h3>,<p></p>")
    )
    .addTo(map);