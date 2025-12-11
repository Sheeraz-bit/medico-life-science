/**
 * MEDICO LIFE SCIENCE - Main JavaScript
 * =====================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // ======================================
    // HEADER SCROLL EFFECT
    // ======================================
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ======================================
    // MOBILE MENU TOGGLE
    // ======================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let isMobileMenuOpen = false;

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            mobileMenu.classList.add('open');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            mobileMenu.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // ======================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================================
    // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // ======================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ======================================
    // FILTER BUTTONS (Products Section)
    // ======================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically filter the products
            // For now, it's just a visual toggle
        });
    });

    // ======================================
    // PARALLAX EFFECT FOR DECORATIVE ELEMENTS
    // ======================================
    const decorations = document.querySelectorAll('.hero-decoration');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        decorations.forEach((decoration, index) => {
            const speed = (index + 1) * 0.1;
            decoration.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ======================================
    // ADD TO CART BUTTONS (Placeholder)
    // ======================================
    const addToCartButtons = document.querySelectorAll('.product-actions .btn');
    
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show a simple notification (you can replace with a toast library)
            showNotification(`${productName} added to cart!`);
        });
    });

    // ======================================
    // SIMPLE NOTIFICATION SYSTEM
    // ======================================
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--accent);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(92, 69, 191, 0.3);
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(10px); }
        }
    `;
    document.head.appendChild(style);

    // ======================================
    // DOWNLOAD PDF BUTTONS (Placeholder)
    // ======================================
    const downloadButtons = document.querySelectorAll('.research-card .btn');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const researchCard = this.closest('.research-card');
            const docTitle = researchCard.querySelector('.research-title').textContent;
            
            showNotification(`Downloading ${docTitle}...`);
        });
    });

    // ======================================
    // FORM VALIDATION (If contact form exists)
    // ======================================
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation and submission logic here
            showNotification('Message sent successfully!');
        });
    }

    // ======================================
    // LAZY LOADING IMAGES
    // ======================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ======================================
    // COUNTER ANIMATION FOR STATS
    // ======================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // You can add counter animations here if needed
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ======================================
    // TESTIMONIAL SLIDER (If multiple testimonials)
    // ======================================
    // This is a placeholder for future testimonial slider functionality
    // You can integrate a library like Swiper.js for this

    console.log('Medico Life Science website loaded successfully!');
});