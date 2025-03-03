document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let location = document.getElementById("location").value;
    if (!location) return;

    let apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert("Location not found.");
                return;
            }
            let lat = parseFloat(data[0].lat);
            let lon = parseFloat(data[0].lon);

            displayMap(lat, lon);
            displayStreetView(lat, lon);
        })
        .catch(error => console.error("Error:", error));
});

// Initialize Leaflet Map
let map;
function displayMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 15);
    }

    L.marker([lat, lon]).addTo(map).bindPopup("Searched Location").openPopup();
}

// Display Google Street View
function displayStreetView(lat, lon) {
    new google.maps.StreetViewPanorama(
        document.getElementById("street-view"),
        {
            position: { lat: lat, lng: lon },
            pov: { heading: 0, pitch: 0 },
            zoom: 1
        }
    );
}
