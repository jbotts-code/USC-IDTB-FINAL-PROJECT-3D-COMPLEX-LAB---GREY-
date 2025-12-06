// Dynamic Copyright Year Updater
// Automatically updates copyright year in footer to current year

document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
});

function updateCopyrightYear() {
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Find all elements with copyright year
    const copyrightElements = document.querySelectorAll('.copyright-year');
    
    // Update each element with current year
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Alternative: Find footer paragraphs and update them
    const footerParagraphs = document.querySelectorAll('footer p');
    footerParagraphs.forEach(paragraph => {
        if (paragraph.innerHTML.includes('&copy;')) {
            // Replace any 4-digit year (like 2026) with current year
            paragraph.innerHTML = paragraph.innerHTML.replace(/\d{4}/, currentYear);
        }
    });
    
    // Log for debugging (can be removed in production)
    console.log(`Copyright year updated to: ${currentYear}`);
}

// Optional: Update year if page stays open past midnight on New Year's
function scheduleYearUpdate() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1); // January 1st of next year
    const timeUntilNextYear = nextYear.getTime() - now.getTime();
    
    // Set timeout to update at midnight on New Year's Day
    setTimeout(() => {
        updateCopyrightYear();
        // Set up annual updates
        setInterval(updateCopyrightYear, 365 * 24 * 60 * 60 * 1000); // Once per year
    }, timeUntilNextYear);
}

// Initialize the year update scheduler
scheduleYearUpdate();