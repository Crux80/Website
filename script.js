document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav ul'); // Target the UL directly for easier toggling

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.parentNode.classList.toggle('active'); // Toggle active class on the parent nav element
            const isExpanded = mainNav.parentNode.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                mobileNavToggle.innerHTML = '&times;'; // Close icon (X)
            } else {
                mobileNavToggle.innerHTML = '☰'; // Menu icon (hamburger)
            }
        });
    }

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add smooth scrolling for anchor links if needed ---
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

});