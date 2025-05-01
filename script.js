document.addEventListener('DOMContentLoaded', function() {
    const bookCover = document.getElementById('bookCover');
    const openBookBtn = document.getElementById('openBook');
    const book = document.getElementById('book');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageSound = document.getElementById('pageSound');
    const pages = document.querySelectorAll('.page');
    
    let currentPage = 0;
    const totalPages = pages.length / 2; // Since we have left and right pages
    
    // Open the book
    openBookBtn.addEventListener('click', function() {
        bookCover.style.transform = 'rotateY(-160deg)';
        setTimeout(() => {
            bookCover.style.display = 'none';
            book.style.display = 'block';
            showPage(0);
        }, 800);
        
        // Play opening sound if available
        try {
            pageSound.currentTime = 0;
            pageSound.play();
        } catch(e) {
            console.log("Sound error:", e);
        }
    });
    
    // Next page button
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
            playPageSound();
        }
    });
    
    // Previous page button
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            playPageSound();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPageBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevPageBtn.click();
        }
    });
    
    // Show the current page
    function showPage(pageIndex) {
        // Hide all pages
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show current left and right pages
        const leftPage = pageIndex * 2;
        const rightPage = leftPage + 1;
        
        if (pages[leftPage]) pages[leftPage].style.display = 'block';
        if (pages[rightPage]) pages[rightPage].style.display = 'block';
        
        // Update button states
        prevPageBtn.disabled = pageIndex === 0;
        nextPageBtn.disabled = pageIndex === totalPages - 1;
        
        // Add page turn animation
        if (pages[leftPage]) {
            pages[leftPage].style.animation = 'none';
            void pages[leftPage].offsetWidth; // Trigger reflow
            pages[leftPage].style.animation = 'pageTurnLeft 0.6s ease';
        }
        
        if (pages[rightPage]) {
            pages[rightPage].style.animation = 'none';
            void pages[rightPage].offsetWidth; // Trigger reflow
            pages[rightPage].style.animation = 'pageTurnRight 0.6s ease';
        }
    }
    
    // Play page turn sound
    function playPageSound() {
        try {
            pageSound.currentTime = 0;
            pageSound.play();
        } catch(e) {
            console.log("Sound error:", e);
        }
    }
    
    // Add floating hearts to final page
    const finalPage = document.querySelector('.final-page .floating-hearts');
    if (finalPage) {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 80 + '%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.color = `hsl(${Math.random() * 30 + 340}, 100%, 70%)`;
            heart.style.animation = `float ${Math.random() * 3 + 2}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.opacity = '0';
            heart.style.transform = 'translateY(0)';
            finalPage.appendChild(heart);
        }
    }
});

// Add keyframe animations dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pageTurnLeft {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(-20deg); }
        100% { transform: rotateY(0deg); }
    }
    
    @keyframes pageTurnRight {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(20deg); }
        100% { transform: rotateY(0deg); }
    }
`;
document.head.appendChild(style);