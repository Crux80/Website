document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Navigation Toggle (Keep this) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.parentNode.classList.toggle('active');
            const isExpanded = mainNav.parentNode.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                mobileNavToggle.innerHTML = '&times;';
            } else {
                mobileNavToggle.innerHTML = '☰';
            }
        });
    }

    // --- Dynamic Year in Footer (Keep this) ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add smooth scrolling for anchor links (Keep this) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- LEAFLET MAP INITIALIZATION AND GEOJSON LOADING ---
    var map = L.map('interactiveMap').setView([40.8, -73.2], 10); // Adjust coordinates and zoom

    // Add a tile layer (basemap) - You can change this provider
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to style Census Tracts based on population density
    function styleCensusTracts(feature) {
        let density = feature.properties.POP2010 / feature.properties.ALAND; // Example: Population density
        return {
            fillColor: getColor(density),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    // Function to get color based on population density (example)
    function getColor(density) {
        if (density > 10000) {
            return '#800026';
        } else if (density > 5000) {
            return '#BD0026';
        } else if (density > 2000) {
            return '#E31A1C';
        } else if (density > 1000) {
            return '#FC4E2A';
        } else if (density > 500) {
            return '#FD8D3C';
        } else if (density > 200) {
            return '#FEB24C';
        } else if (density > 100) {
            return '#FED976';
        } else {
            return '#FFFFCC';
        }
    }

    // Load Census Tracts GeoJSON
    fetch('/data/CensusTracts.geojson') // Adjust path if needed
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: styleCensusTracts,
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.NAMELSAD) {
                        layer.bindPopup('Census Tract: ' + feature.properties.NAMELSAD + '<br>Population: ' + feature.properties.POP2010);
                    }
                }
            }).addTo(map);
        });

    // Load Mill Pond Buffer GeoJSON
    fetch('/data/MillPond_Buffer.geojson') // Adjust path if needed
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: 'blue',
                    weight: 2,
                    fillOpacity: 0.2
                }
            }).addTo(map);
        });

    // Load Stump Pond Buffer GeoJSON
    fetch('/data/StumpPond_Buffer.geojson') // Adjust path if needed
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: 'purple',
                    weight: 2,
                    fillOpacity: 0.2
                }
            }).addTo(map);
        });

    // Load Town Polygon GeoJSON
    fetch('/data/Town_Polygon.geojson') // Adjust path if needed
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: 'black',
                    weight: 3,
                    fillOpacity: 0
                }
            }).addTo(map);
        });

});