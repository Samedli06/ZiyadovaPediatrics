// ===== ACCORDION FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeAccordions();
});

function initializeAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            // Set initial ARIA attributes
            const id = 'accordion-' + Math.random().toString(36).substr(2, 9);
            const contentId = 'content-' + id;
            
            header.setAttribute('aria-controls', contentId);
            content.setAttribute('id', contentId);
            
            // Add click handler
            header.addEventListener('click', function() {
                toggleAccordion(item);
            });
            
            // Add keyboard support
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(item);
                }
            });
            
            // Set initial state
            const isActive = item.classList.contains('active');
            header.setAttribute('aria-expanded', isActive);
        }
    });
}

function toggleAccordion(item) {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');
    
    // Close all other accordion items (optional - remove if you want multiple open)
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            closeAccordion(otherItem);
        }
    });
    
    // Toggle current item
    if (isActive) {
        closeAccordion(item);
    } else {
        openAccordion(item);
    }
}

function openAccordion(item) {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    item.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    
    // Animate content height
    const contentHeight = content.scrollHeight;
    content.style.maxHeight = contentHeight + 'px';
    
    // Add smooth transition
    content.style.transition = 'max-height 0.3s ease-in-out';
    
    // Trigger reflow
    content.offsetHeight;
}

function closeAccordion(item) {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    item.classList.remove('active');
    header.setAttribute('aria-expanded', 'false');
    
    // Animate content height
    content.style.maxHeight = '0px';
    
    // Remove transition after animation
    setTimeout(() => {
        content.style.transition = '';
    }, 300);
}

// ===== FAQ SPECIFIC FUNCTIONALITY =====

function initializeFAQ() {
    // Add search functionality if needed
    const searchInput = document.querySelector('.faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterFAQ(this.value);
        }, 300));
    }
    
    // Add category filtering if needed
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterFAQByCategory(category);
        });
    });
}

function filterFAQ(searchTerm) {
    const faqItems = document.querySelectorAll('.accordion-item');
    const searchTermLower = searchTerm.toLowerCase();
    
    faqItems.forEach(item => {
        const title = item.querySelector('.accordion-title').textContent.toLowerCase();
        const content = item.querySelector('.accordion-body').textContent.toLowerCase();
        
        if (title.includes(searchTermLower) || content.includes(searchTermLower)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterFAQByCategory(category) {
    const faqItems = document.querySelectorAll('.accordion-item');
    
    faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== UTILITY FUNCTIONS =====

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

// ===== EXPORT FOR GLOBAL USE =====

window.AccordionManager = {
    initializeAccordions,
    toggleAccordion,
    openAccordion,
    closeAccordion,
    initializeFAQ,
    filterFAQ,
    filterFAQByCategory
};
