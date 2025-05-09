document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Navigation Toggle (Keep this) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.parentNode.classList.toggle('active');
            const isExpanded = mainNav.parentNode.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            mobileNavToggle.innerHTML = isExpanded ? '&times;' : '☰';
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
    const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');

    function createPlotlyChart(chartId, fileName, chartTitle) {
        const jsonUrl = basePath + 'data/' + fileName;

        return fetch(jsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const layout = {
                    ...data.layout,
                    title: {
                        text: chartTitle,
                        font: {
                            family: 'Merriweather',
                            size: 20,
                            color: '#005A9C'
                        },
                        x: 0.5,
                        xanchor: 'center'
                    }
                };
                Plotly.newPlot(chartId, data.data, layout, { responsive: true });
            })
            .catch(error => {
                console.error('Error fetching ' + jsonUrl + ':', error);
                const chartContainer = document.getElementById(chartId);
                if (chartContainer) {
                    chartContainer.innerHTML = `<p>Error loading ${chartTitle} data.</p>`;
                }
            });
    }


 // Render all charts
    Promise.all([
        createPlotlyChart('medianSalePriceChart', 'median_sale_price.json', 'Median Sale Price (Mar 2024 - Mar 2025)'),
        createPlotlyChart('homesSoldChart', 'homes_sold.json', 'Homes Sold Over Time (Mar 2024 - Mar 2025)'),
        createPlotlyChart('inventoryChart', 'inventory.json', 'Inventory Over Time (Mar 2024 - Mar 2025)'),
        createPlotlyChart('stumpPondLandUseChart', 'stump_pond_land_use.json', 'Stump Pond Land Use'),
        createPlotlyChart('millPondLandUseChart', 'mill_pond_land_use.json', 'Mill Pond Land Use')
    ]).then(() => {
        console.log("All charts rendered successfully.");
    });
});

