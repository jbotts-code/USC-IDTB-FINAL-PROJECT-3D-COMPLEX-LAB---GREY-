// Portfolio Slideshow JavaScript with Animations
let currentSlideIndex = 0;
let slides, indicators;
let autoAdvanceInterval;
let isTransitioning = false;

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements after page loads
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        startAutoAdvance();
        setupEventListeners();
    }
});

// Function to show a specific slide with animation
function showSlide(index, direction = 'next') {
    if (!slides || !indicators || isTransitioning) return;
    
    isTransitioning = true;
    
    // Wrap around if index is out of bounds
    let newIndex = index;
    if (index >= slides.length) {
        newIndex = 0;
    } else if (index < 0) {
        newIndex = slides.length - 1;
    }
    
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[newIndex];
    
    if (currentSlide === nextSlide) {
        isTransitioning = false;
        return;
    }
    
    // Set up the next slide for animation
    nextSlide.style.display = 'flex';
    nextSlide.classList.remove('active');
    
    // Determine animation direction
    if (direction === 'next') {
        nextSlide.classList.add('slide-in-right');
    } else {
        nextSlide.classList.add('slide-in-right');
        nextSlide.style.transform = 'translateX(-100%)';
    }
    
    // Force reflow to ensure classes are applied
    nextSlide.offsetHeight;
    
    // Start the transition
    setTimeout(() => {
        // Remove active from current slide
        currentSlide.classList.remove('active');
        currentSlide.classList.add('slide-out-left');
        
        // Activate next slide
        nextSlide.classList.remove('slide-in-right');
        nextSlide.classList.add('active');
        nextSlide.style.transform = '';
        
        // Update indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));
        if (indicators[newIndex]) {
            indicators[newIndex].classList.add('active');
        }
        
        currentSlideIndex = newIndex;
        
        // Clean up after transition
        setTimeout(() => {
            // Hide the old slide
            currentSlide.style.display = 'none';
            currentSlide.classList.remove('slide-out-left');
            
            // Reset next slide classes
            nextSlide.classList.remove('slide-in-right');
            
            isTransitioning = false;
        }, 600); // Match CSS transition duration
        
    }, 50);
}

// Function to change slide by offset (1 for next, -1 for previous)
function changeSlide(offset) {
    if (isTransitioning) return;
    
    const direction = offset > 0 ? 'next' : 'prev';
    showSlide(currentSlideIndex + offset, direction);
}

// Function to go to a specific slide (called by indicators)
function currentSlide(index) {
    if (isTransitioning) return;
    
    const targetIndex = index - 1; // Convert from 1-based to 0-based index
    const direction = targetIndex > currentSlideIndex ? 'next' : 'prev';
    showSlide(targetIndex, direction);
}

// Start auto-advance functionality
function startAutoAdvance() {
    autoAdvanceInterval = setInterval(function() {
        if (!isTransitioning) {
            changeSlide(1);
        }
    }, 5000);
}

// Stop auto-advance functionality
function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (isTransitioning) return;
        
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Mouse hover pause/resume
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoAdvance);
        slideshowContainer.addEventListener('mouseleave', startAutoAdvance);
    }
}

// Make functions globally available for onclick handlers
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;