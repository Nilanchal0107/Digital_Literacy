// ========================================
// DIGITAL LITERACY PRESENTATION - JAVASCRIPT
// Slide Navigation & Interactivity with Progressive Reveals
// ========================================

// Variables
let currentSlide = 1;
const totalSlides = 13;
let currentRevealIndex = 0;
let revealItems = [];

// Dark Mode Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedMode = localStorage.getItem('darkMode');

    // Apply saved preference
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    updateSlideCounter();
    updateNavigationArrows();
    updateProgressBar();
    initializeRevealItems();
});

// Initialize reveal items for current slide
function initializeRevealItems() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;

    // Get ALL reveal items in DOM order (both reveal-item and reveal-item-last)
    revealItems = Array.from(activeSlide.querySelectorAll('.reveal-item, .reveal-item-last'));
    currentRevealIndex = 0;

    // Hide all reveal items initially
    revealItems.forEach(item => {
        item.classList.remove('revealed');
    });
}

// Reveal next item or go to next slide
function revealNextOrAdvanceSlide() {
    if (currentRevealIndex < revealItems.length) {
        // Reveal next item
        revealItems[currentRevealIndex].classList.add('revealed');
        currentRevealIndex++;
    } else {
        // All items revealed, go to next slide
        if (currentSlide < totalSlides) {
            showSlide(currentSlide + 1);
        }
    }
}

// Function to show specific slide
function showSlide(slideNumber) {
    // Validate slide number
    if (slideNumber < 1 || slideNumber > totalSlides) {
        return;
    }

    // Get all slides
    const slides = document.querySelectorAll('.slide');
    const targetSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);

    if (!targetSlide) return;

    // Remove active from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show the target slide
    targetSlide.classList.add('active');
    currentSlide = slideNumber;
    
    // Reset reveal system for new slide
    initializeRevealItems();
    
    updateSlideCounter();
    updateNavigationArrows();
    updateProgressBar();
}

// Function to go to next slide (direct jump, no reveals)
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

// Function to go to previous slide
function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// Update slide counter display
function updateSlideCounter() {
    const currentSlideElement = document.getElementById('current-slide');
    const totalSlidesElement = document.getElementById('total-slides');

    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Update navigation arrows (disable at boundaries)
function updateNavigationArrows() {
    const leftArrow = document.getElementById('nav-left');
    const rightArrow = document.getElementById('nav-right');

    if (leftArrow) {
        if (currentSlide === 1) {
            leftArrow.classList.add('disabled');
        } else {
            leftArrow.classList.remove('disabled');
        }
    }

    if (rightArrow) {
        if (currentSlide === totalSlides) {
            rightArrow.classList.add('disabled');
        } else {
            rightArrow.classList.remove('disabled');
        }
    }
}

// Unified keyboard navigation
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowRight':
        case 'Right':
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'Left':
            previousSlide();
            break;
        case 'Home':
            showSlide(1);
            break;
        case 'End':
            showSlide(totalSlides);
            break;
        case ' ': // Spacebar
            event.preventDefault();
            revealNextOrAdvanceSlide();
            break;
        default:
            // Number key navigation (1-9 jump to specific slide)
            if (event.key >= '1' && event.key <= '9') {
                const targetSlide = parseInt(event.key);
                if (targetSlide <= totalSlides) {
                    showSlide(targetSlide);
                }
            }
            break;
    }
});

// Left click = Advance through reveals
document.addEventListener('click', function (event) {
    // Ignore clicks on navigation arrows and counter
    if (event.target.closest('.nav-arrow') || event.target.closest('.slide-counter') || event.target.closest('.dark-mode-toggle')) {
        return;
    }

    // Left click - reveal next or advance slide
    revealNextOrAdvanceSlide();
});

// Right click = Previous slide (direct jump)
document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent context menu

    // Ignore clicks on navigation arrows and counter
    if (event.target.closest('.nav-arrow') || event.target.closest('.slide-counter')) {
        return;
    }

    // Right click - previous slide
    previousSlide();
});

// Navigation arrow click events
document.getElementById('nav-left').addEventListener('click', function (event) {
    event.stopPropagation();
    previousSlide();
});

document.getElementById('nav-right').addEventListener('click', function (event) {
    event.stopPropagation();
    nextSlide();
});

// Touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        previousSlide();
    }
}

// Prevent accidental text selection while clicking
document.addEventListener('selectstart', function (event) {
    if (event.target.closest('.slide-background')) {
        event.preventDefault();
    }
});

// Log current slide for debugging
console.log('Digital Literacy Presentation Loaded');
console.log('Total Slides:', totalSlides);
console.log('Current Slide:', currentSlide);
console.log('Navigation: Left click=reveal/advance, Right click=previous, Arrow keys=jump slides');