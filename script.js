// ========================================
// DIGITAL LITERACY PRESENTATION - JAVASCRIPT
// Slide Navigation & Interactivity
// ========================================

// Variables
let currentSlide = 1;
const totalSlides = 13;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateSlideCounter();
    updateNavigationArrows();
});

// Function to show specific slide
function showSlide(slideNumber) {
    // Validate slide number
    if (slideNumber < 1 || slideNumber > totalSlides) {
        return;
    }

    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show the target slide
    const targetSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        currentSlide = slideNumber;
        updateSlideCounter();
        updateNavigationArrows();
    }
}

// Function to go to next slide
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

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
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
    }
});

// Mouse click navigation
// Left click = Next slide
document.addEventListener('click', function(event) {
    // Ignore clicks on navigation arrows and counter
    if (event.target.closest('.nav-arrow') || event.target.closest('.slide-counter')) {
        return;
    }
    
    // Left click - next slide
    nextSlide();
});

// Right click = Previous slide
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Prevent context menu
    
    // Ignore clicks on navigation arrows and counter
    if (event.target.closest('.nav-arrow') || event.target.closest('.slide-counter')) {
        return;
    }
    
    // Right click - previous slide
    previousSlide();
});

// Navigation arrow click events
document.getElementById('nav-left').addEventListener('click', function(event) {
    event.stopPropagation();
    previousSlide();
});

document.getElementById('nav-right').addEventListener('click', function(event) {
    event.stopPropagation();
    nextSlide();
});

// Touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        previousSlide();
    }
}

// Spacebar navigation (next slide)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        nextSlide();
    }
});

// Number key navigation (jump to specific slide)
document.addEventListener('keydown', function(event) {
    // Check if a number key (1-9) was pressed
    if (event.key >= '1' && event.key <= '9') {
        const targetSlide = parseInt(event.key);
        if (targetSlide <= totalSlides) {
            showSlide(targetSlide);
        }
    }
});

// Prevent accidental text selection while clicking
document.addEventListener('selectstart', function(event) {
    if (event.target.closest('.slide-background')) {
        event.preventDefault();
    }
});

// Add smooth scroll behavior
document.querySelectorAll('.slide-background').forEach(slideBackground => {
    slideBackground.style.scrollBehavior = 'smooth';
});

// Log current slide for debugging (optional)
console.log('Digital Literacy Presentation Loaded');
console.log('Total Slides:', totalSlides);
console.log('Current Slide:', currentSlide);
console.log('Navigation: Arrow keys, Mouse clicks (left/right), Touch swipe, Number keys (1-9)');