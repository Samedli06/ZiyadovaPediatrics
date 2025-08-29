// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageSwitcher();
    initializeWhatsAppLinks();
    initializeScrollEffects();
    initializeAccessibility();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Mobile menu toggle
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const isOpen = mobileMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Active navigation highlighting
    highlightActiveNav();
}

// Highlight active navigation item
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace(/^\//, ''))) {
            link.classList.add('active');
        }
    });
}

// ===== LANGUAGE SWITCHER =====
function initializeLanguageSwitcher() {
    // Handle button-based language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Handle select-based language switcher
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            const lang = this.value;
            switchLanguage(lang);
        });
    }
    
    // Set active language on page load
    setActiveLanguage();
}

// Switch language
function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    const currentLang = getCurrentLanguage();
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    
    // Get equivalent page in new language
    const newPath = getEquivalentPath(currentPath, currentLang, lang);
    
    if (newPath) {
        window.location.href = newPath;
    } else {
        // Fallback to language root
        window.location.href = `/${lang}/`;
    }
}

// Get current language from URL
function getCurrentLanguage() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(az|ru|en)/);
    return langMatch ? langMatch[1] : 'az';
}

// Set active language button/select
function setActiveLanguage() {
    const currentLang = getCurrentLanguage();
    
    // Handle button-based language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        const lang = button.getAttribute('data-lang');
        if (lang === currentLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Handle select-based language switcher
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.value = currentLang;
    }
}

// Get equivalent path in different language
function getEquivalentPath(currentPath, fromLang, toLang) {
    // Language mapping for disease slugs
    const diseaseSlugs = {
        'az': {
            'sut-intoleransi': 'sut-intoleransi',
            'usaq-yoluxucu-xestelikler': 'usaq-yoluxucu-xestelikler',
            'sepgili-infeksion-xestelikler': 'sepgili-infeksion-xestelikler',
            'anadangelme-infeksion-xestelikler': 'anadangelme-infeksion-xestelikler',
            'rutin-peyvend-cedvelleri': 'rutin-peyvend-cedvelleri',
            'yoluxucu-xestelikler': 'yoluxucu-xestelikler'
        },
        'ru': {
            'sut-intoleransi': 'neperenosimost-moloka',
            'usaq-yoluxucu-xestelikler': 'infekcionnye-bolezni-detej',
            'sepgili-infeksion-xestelikler': 'temperaturnye-infekcionnye-bolezni',
            'anadangelme-infeksion-xestelikler': 'vrozhdennye-infekcionnye-bolezni',
            'rutin-peyvend-cedvelleri': 'rutinnye-shemy-vakcinacii',
            'yoluxucu-xestelikler': 'infekcionnye-bolezni-detej'
        },
        'en': {
            'sut-intoleransi': 'milk-intolerance',
            'usaq-yoluxucu-xestelikler': 'pediatric-infectious-diseases',
            'sepgili-infeksion-xestelikler': 'febrile-infectious-diseases',
            'anadangelme-infeksion-xestelikler': 'congenital-infectious-diseases',
            'rutin-peyvend-cedvelleri': 'routine-vaccination-schedules',
            'yoluxucu-xestelikler': 'pediatric-infectious-diseases'
        }
    };
    
    // Replace language in path
    let newPath = currentPath.replace(`/${fromLang}/`, `/${toLang}/`);
    
    // Handle disease page slugs
    if (newPath.includes('/diseases/')) {
        const slugMatch = newPath.match(/\/diseases\/([^\/]+)/);
        if (slugMatch) {
            const currentSlug = slugMatch[1];
            const fromSlugs = diseaseSlugs[fromLang] || {};
            const toSlugs = diseaseSlugs[toLang] || {};
            
            // Find the disease name from current slug
            let diseaseName = null;
            for (const [name, slug] of Object.entries(fromSlugs)) {
                if (slug === currentSlug) {
                    diseaseName = name;
                    break;
                }
            }
            
            // Get equivalent slug in target language
            if (diseaseName && toSlugs[diseaseName]) {
                newPath = newPath.replace(currentSlug, toSlugs[diseaseName]);
            }
        }
    }
    
    return newPath;
}

// ===== WHATSAPP LINKS =====
function initializeWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
    const currentLang = getCurrentLanguage();
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = this.getAttribute('data-whatsapp') || '994504662244';
            const message = getWhatsAppMessage(currentLang);
            openWhatsApp(phone, message);
        });
    });
}

// Get WhatsApp message based on language
function getWhatsAppMessage(lang) {
    const messages = {
        'az': 'Salam, görüş üçün rezervasiya etmek istəyirəm',
        'ru': 'Здравствуйте, хочу записаться на прием',
        'en': 'Hello, I would like to make an appointment'
    };
    
    return encodeURIComponent(messages[lang] || messages['az']);
}

// Open WhatsApp
function openWhatsApp(phone, message) {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const baseUrl = isMobile ? 'https://wa.me/' : 'https://api.whatsapp.com/send';
    const url = `${baseUrl}?phone=${phone}&text=${message}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.card, .service-card, .disease-card');
        animateElements.forEach(el => observer.observe(el));
    }
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.focus();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Keyboard navigation for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Focus trap for mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        const focusableElements = mobileMenu.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        mobileMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format phone number
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4');
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Get device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export functions for use in other modules
window.ZiyadovaPediatrics = {
    switchLanguage,
    openWhatsApp,
    formatPhoneNumber,
    validateEmail,
    getDeviceType,
    isInViewport
};
