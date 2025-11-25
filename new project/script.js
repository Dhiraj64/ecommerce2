// Clean, safe DOM-ready script
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Smooth Scroll Function (exposed globally for inline onclick handlers)
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    // Product Enquiry Modal
    const modal = document.getElementById('enquiryModal');
    const closeBtn = modal ? modal.querySelector('.close') : null;
    const productNameElement = document.getElementById('productName');

    // Expose globally because HTML uses inline onclick="showEnquiry(...)"
    window.showEnquiry = function(productName) {
        if (!modal || !productNameElement) return;
        productNameElement.textContent = `Enquiring about: ${productName}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Enquiry Form Submission
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('enquiryName').value || '';
            const phone = document.getElementById('enquiryPhone').value || '';
            const message = document.getElementById('enquiryMessage').value || '';
            const product = productNameElement ? productNameElement.textContent : '';

            // Show success message
            alert(`Thank you, ${name}! Your enquiry for "${product}" has been received. We will contact you at ${phone} soon.`);

            // Reset form
            enquiryForm.reset();
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }

            // In a real application, you would send this data to a server
            console.log({ name, phone, message, product });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value || '';
            const email = document.getElementById('email').value || '';
            const phone = document.getElementById('phone').value || '';
            const message = document.getElementById('message').value || '';

            // Show success message
            alert(`Thank you, ${name}! Your message has been sent successfully. We will get back to you at ${email} soon.`);

            // Reset form
            contactForm.reset();

            // In a real application, you would send this data to a server
            console.log({ name, email, phone, message });
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.product-card, .service-card, .feature');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinksArray = Array.from(navLinks || []);
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').slice(1) === current) link.classList.add('active-link');
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Disable right-click on product images (optional protection)
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(img => img.addEventListener('contextmenu', (e) => e.preventDefault()));

    // Console welcome message
    console.log('%c🌺 Welcome to Maa Bhagwati Flowers! 🌺', 'color: #d946ef; font-size: 20px; font-weight: bold;');
    console.log('%cSpread love with beautiful flowers 💐', 'color: #ec4899; font-size: 14px;');
});