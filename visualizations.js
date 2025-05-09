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

    // --- CHART.JS INITIALIZATION (Keep this if you are using the charts)---
    //  (Your Chart.js code would go here)
    //  For example:
    //  const populationBarChart = new Chart(document.getElementById('populationBarChart'), { ... });
    //  const millPondPieChart = new Chart(document.getElementById('millPondPieChart'), { ... });
    //  etc.

    // --- Plotly Chart Rendering ---

    // Function to create and render a Plotly chart
    function createPlotlyChart(chartId, jsonDataUrl) {
        return fetch(jsonDataUrl)
            .then(response => response.json())
            .then(data => {
                Plotly.newPlot(chartId, data.data, data.layout);
            })
            .catch(error => {
                console.error('Error fetching ' + jsonDataUrl + ':', error);
                // Optionally, display an error message on the page
                document.getElementById(chartId).innerHTML = "<p>Error loading chart data.</p>";
            });
    }

    // Render the charts
    Promise.all([
        createPlotlyChart('medianSalePriceChart', '/data/median_sale_price.json'),
        createPlotlyChart('homesSoldChart', '/data/homes_sold.json'),
        createPlotlyChart('inventoryChart', '/data/inventory.json')
    ]).then(() => {
        console.log("All charts rendered successfully (or errors handled).");
    });


});