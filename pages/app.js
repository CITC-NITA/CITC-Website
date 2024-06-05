
const body = document.body;
const toggleSwitch = document.getElementById('toggleSwitch');
const colors = ['white-background', 'black-background', 'gray-background'];
let currentIndex = 0;

toggleSwitch.addEventListener('change', function() {
    body.classList.remove(colors[currentIndex]);
    currentIndex = (currentIndex + 1) % colors.length;
    body.classList.add(colors[currentIndex]);
});

// Initialize the background to white
body.classList.add('white-background');




let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const head = document.getElementById('head');

    if (window.scrollY > lastScrollY) {
        // Scrolling down
        head.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        head.style.transform = 'translateY(0)';
    }

    lastScrollY = window.scrollY;
});
