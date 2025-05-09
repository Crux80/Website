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

    // --- Plotly Chart Rendering ---

    // Function to create and render a Plotly chart
    function createPlotlyChart(chartId, jsonDataUrl, chartTitle) {
        return fetch(jsonDataUrl)
            .then(response => response.json())
            .then(data => {
                const layout = {
                    ...data.layout, // Merge fetched layout with any specific settings
                    title: {
                        text: chartTitle, // Set the chart title
                        font: {
                            family: 'Merriweather', // Use your heading font
                            size: 20,
                            color: '#005A9C'      // Use your primary color
                        },
                        x: 0.5,             // Center the title
                        xanchor: 'center'
                    },
                    responsive: true     // Make the chart responsive
                };
                Plotly.newPlot(chartId, data.data, layout);
            })
            .catch(error => {
                console.error('Error fetching ' + jsonDataUrl + ':', error);
                document.getElementById(chartId).innerHTML = "<p>Error loading " + chartTitle + " data.</p>";
            });
    }

    // Render the charts
    Promise.all([
        createPlotlyChart('medianSalePriceChart', '/data/median_sale_price.json', 'Median Sale Price (Mar 2024 - Mar 2025)'),
        createPlotlyChart('homesSoldChart', '/data/homes_sold.json', 'Homes Sold Over Time (Mar 2024 - Mar 2025)'),
        createPlotlyChart('inventoryChart', '/data/inventory.json', 'Inventory Over Time (Mar 2024 - Mar 2025)')
    ]).then(() => {
        console.log("All charts rendered successfully (or errors handled).");
    });

});