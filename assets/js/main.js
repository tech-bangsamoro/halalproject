// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Active nav link based on current page
const currentLocation = location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate class
document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start > target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Progress bar
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Interactive framework components (for framework page)
function initFrameworkInteractions() {
    const frameworkComponents = document.querySelectorAll('.framework-component');
    const detailPanel = document.querySelector('.detail-panel');
    
    frameworkComponents.forEach(component => {
        component.addEventListener('click', () => {
            // Remove active class from all components
            frameworkComponents.forEach(c => c.classList.remove('active'));
            // Add active class to clicked component
            component.classList.add('active');
            
            // Get component data
            const title = component.getAttribute('data-title');
            const description = component.getAttribute('data-description');
            const details = component.getAttribute('data-details');
            
            // Update detail panel
            if (detailPanel) {
                detailPanel.innerHTML = `
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="details">${details}</div>
                `;
                detailPanel.classList.add('active');
            }
        });
    });
}

// Initialize chart.js charts
function initCharts() {
    // Market Growth Chart
    const marketGrowthCanvas = document.getElementById('marketGrowthChart');
    if (marketGrowthCanvas) {
        const ctx = marketGrowthCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'],
                datasets: [{
                    label: 'Global Halal Market Value (Trillion USD)',
                    data: [2.9, 3.3, 3.7, 4.2, 4.7, 5.3, 6.0, 6.8, 7.7, 8.7],
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y + 'T';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'T';
                            }
                        }
                    }
                }
            }
        });
    }

    // Investment Phases Chart
    const investmentPhasesCanvas = document.getElementById('investmentPhasesChart');
    if (investmentPhasesCanvas) {
        const ctx = investmentPhasesCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Phase 1 (Years 1-3)', 'Phase 2 (Years 3-5)', 'Phase 3 (Years 5-10)'],
                datasets: [{
                    label: 'Investment Required',
                    data: [1, 4, 15],
                    backgroundColor: ['#4caf50', '#66bb6a', '#81c784']
                }, {
                    label: 'Expected Revenue',
                    data: [0.2, 0.8, 3],
                    backgroundColor: ['#1976d2', '#2196f3', '#42a5f5']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₱' + context.parsed.y + 'B';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₱' + value + 'B';
                            }
                        }
                    }
                }
            }
        });
    }

    // Market Share Pie Chart
    const marketShareCanvas = document.getElementById('marketShareChart');
    if (marketShareCanvas) {
        const ctx = marketShareCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Food & Beverage', 'Islamic Finance', 'Halal Tourism', 'Pharmaceuticals', 'Cosmetics', 'Others'],
                datasets: [{
                    data: [35, 25, 15, 12, 8, 5],
                    backgroundColor: [
                        '#1976d2',
                        '#2196f3',
                        '#4caf50',
                        '#66bb6a',
                        '#ffa726',
                        '#ff7043'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ROI Calculator
function initROICalculator() {
    const calculator = document.getElementById('roiCalculator');
    if (!calculator) return;

    const investmentInput = calculator.querySelector('#investmentAmount');
    const phaseSelect = calculator.querySelector('#investmentPhase');
    const calculateBtn = calculator.querySelector('#calculateROI');
    const resultsDiv = calculator.querySelector('#roiResults');

    calculateBtn?.addEventListener('click', () => {
        const investment = parseFloat(investmentInput.value);
        const phase = phaseSelect.value;

        if (!investment || investment <= 0) {
            alert('Please enter a valid investment amount');
            return;
        }

        let roi, payback, irr;
        switch(phase) {
            case '1':
                roi = investment * 0.18 * 5; // 18% annual return for 5 years
                payback = '4-5 years';
                irr = '18%';
                break;
            case '2':
                roi = investment * 0.21 * 7; // 21% annual return for 7 years
                payback = '3-4 years';
                irr = '21%';
                break;
            case '3':
                roi = investment * 0.25 * 10; // 25% annual return for 10 years
                payback = '2-3 years';
                irr = '25%';
                break;
        }

        resultsDiv.innerHTML = `
            <div class="roi-result">
                <h4>Investment Analysis</h4>
                <div class="result-grid">
                    <div class="result-item">
                        <span class="result-label">Initial Investment</span>
                        <span class="result-value">₱${investment.toLocaleString()}M</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Returns</span>
                        <span class="result-value">₱${roi.toLocaleString()}M</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Payback Period</span>
                        <span class="result-value">${payback}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Internal Rate of Return</span>
                        <span class="result-value">${irr}</span>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.classList.add('active');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize framework interactions if on framework page
    if (document.querySelector('.framework-component')) {
        initFrameworkInteractions();
    }

    // Initialize charts if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        initCharts();
    }

    // Initialize ROI calculator
    initROICalculator();

    // Add loading class removal
    document.body.classList.add('loaded');
});

// Utility function to format currency
function formatCurrency(amount, currency = '₱') {
    return currency + amount.toLocaleString();
}

// Export functions for use in other scripts
window.HalalInvestment = {
    animateCounter,
    formatCurrency,
    initCharts,
    initROICalculator
};