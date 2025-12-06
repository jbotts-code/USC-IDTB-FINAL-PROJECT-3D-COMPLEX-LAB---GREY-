/**
 * Scroll-triggered fly-in animations for list items
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

function initializeScrollAnimations() {
    // Get all keypoints lists
    const keypointLists = document.querySelectorAll('.keypoints');
    
    // Get animated hero text elements
    const animatedHeroTexts = document.querySelectorAll('.animated-hero-text');
    
    // Create intersection observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('keypoints')) {
                    // Handle keypoints list animation
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fly-in');
                        }, index * 100);
                    });
                } else if (entry.target.classList.contains('animated-hero-text')) {
                    // Handle hero text animation
                    setTimeout(() => {
                        entry.target.classList.add('fly-in');
                    }, 100);
                }
                
                // Stop observing this element once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully visible
    });
    
    // Start observing all keypoints lists
    keypointLists.forEach(list => {
        observer.observe(list);
    });
    
    // Start observing all animated hero text elements
    animatedHeroTexts.forEach(text => {
        observer.observe(text);
    });
}

// Alternative function for browsers that don't support IntersectionObserver
function fallbackScrollAnimation() {
    const keypointLists = document.querySelectorAll('.keypoints');
    const animatedHeroTexts = document.querySelectorAll('.animated-hero-text');
    
    function checkScroll() {
        // Check keypoints lists
        keypointLists.forEach(list => {
            const rect = list.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !list.classList.contains('animated')) {
                list.classList.add('animated');
                const listItems = list.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fly-in');
                    }, index * 100);
                });
            }
        });
        
        // Check animated hero text elements
        animatedHeroTexts.forEach(text => {
            const rect = text.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !text.classList.contains('animated')) {
                text.classList.add('animated');
                setTimeout(() => {
                    text.classList.add('fly-in');
                }, 100);
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
}

// Use IntersectionObserver if supported, otherwise fall back to scroll event
if ('IntersectionObserver' in window) {
    // Modern browsers - use IntersectionObserver
    // Already initialized above
} else {
    // Older browsers - use scroll event
    fallbackScrollAnimation();
}