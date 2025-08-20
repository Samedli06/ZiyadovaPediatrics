// ===== LIGHTBOX FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeLightbox();
});

function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        createLightbox();
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
        
        // Add keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
}

function createLightbox() {
    const lightboxHTML = `
        <div class="lightbox" role="dialog" aria-label="Gallery Lightbox">
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
                <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
                <img class="lightbox-image" alt="" />
                <div class="lightbox-caption"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add event listeners
    const lightbox = document.querySelector('.lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);
    
    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
}

let currentIndex = 0;
let galleryItems = [];

function openLightbox(index) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    // Get all gallery items
    galleryItems = Array.from(document.querySelectorAll('.gallery-item img, .gallery-item video'));
    currentIndex = index;
    
    if (galleryItems.length === 0) return;
    
    const currentItem = galleryItems[currentIndex];
    
    // Set image or video
    if (currentItem.tagName === 'IMG') {
        lightboxImage.src = currentItem.src;
        lightboxImage.alt = currentItem.alt || '';
        lightboxImage.style.display = 'block';
        
        // Hide video if present
        const lightboxVideo = lightbox.querySelector('.lightbox-video');
        if (lightboxVideo) {
            lightboxVideo.style.display = 'none';
        }
    } else if (currentItem.tagName === 'VIDEO') {
        // Create video element if it doesn't exist
        let lightboxVideo = lightbox.querySelector('.lightbox-video');
        if (!lightboxVideo) {
            lightboxVideo = document.createElement('video');
            lightboxVideo.className = 'lightbox-video';
            lightboxVideo.controls = true;
            lightboxVideo.autoplay = true;
            lightbox.querySelector('.lightbox-content').insertBefore(lightboxVideo, lightboxCaption);
        }
        
        lightboxVideo.src = currentItem.src;
        lightboxVideo.style.display = 'block';
        lightboxImage.style.display = 'none';
    }
    
    // Set caption
    const caption = currentItem.getAttribute('data-caption') || currentItem.alt || '';
    lightboxCaption.textContent = caption;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    lightbox.focus();
    
    // Update navigation buttons
    updateNavigationButtons();
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxVideo = lightbox.querySelector('.lightbox-video');
    
    // Pause video if playing
    if (lightboxVideo) {
        lightboxVideo.pause();
    }
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to the item that was clicked
    if (galleryItems[currentIndex]) {
        const originalItem = document.querySelector(`[src="${galleryItems[currentIndex].src}"]`);
        if (originalItem) {
            originalItem.focus();
        }
    }
}

function showPrevious() {
    if (galleryItems.length === 0) return;
    
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
}

function showNext() {
    if (galleryItems.length === 0) return;
    
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxVideo = lightbox.querySelector('.lightbox-video');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    
    const currentItem = galleryItems[currentIndex];
    
    if (currentItem.tagName === 'IMG') {
        lightboxImage.src = currentItem.src;
        lightboxImage.alt = currentItem.alt || '';
        lightboxImage.style.display = 'block';
        
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.style.display = 'none';
        }
    } else if (currentItem.tagName === 'VIDEO') {
        if (lightboxVideo) {
            lightboxVideo.src = currentItem.src;
            lightboxVideo.style.display = 'block';
            lightboxImage.style.display = 'none';
        }
    }
    
    const caption = currentItem.getAttribute('data-caption') || currentItem.alt || '';
    lightboxCaption.textContent = caption;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const lightbox = document.querySelector('.lightbox');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    // Show/hide navigation buttons based on number of items
    if (galleryItems.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

function handleLightboxKeyboard(e) {
    const lightbox = document.querySelector('.lightbox');
    
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevious();
            break;
        case 'ArrowRight':
            showNext();
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            e.preventDefault();
            break;
    }
}

// ===== GALLERY FILTERING =====

function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterGallery(category);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== LAZY LOADING =====

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== UTILITY FUNCTIONS =====

function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function preloadNextImage() {
    if (galleryItems.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    const nextItem = galleryItems[nextIndex];
    
    if (nextItem.tagName === 'IMG') {
        preloadImage(nextItem.src);
    }
}

// ===== EXPORT FOR GLOBAL USE =====

window.LightboxManager = {
    initializeLightbox,
    openLightbox,
    closeLightbox,
    showPrevious,
    showNext,
    initializeGalleryFilter,
    filterGallery,
    initializeLazyLoading
};
