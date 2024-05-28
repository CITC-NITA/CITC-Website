const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element not found for selector: ${selector}`);
    return element;
};



const selectAllElements = (selector) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) throw new Error(`No elements found for selector: ${selector}`);
    return elements;
};




const state = {
    currentIndex: 0,
    animating: false,
};

const cards = selectAllElements('.card');
const cardBtns = selectAllElements('.cardList__btn');
const loaderWrapper = selectElement('.loading__wrapper');

document.addEventListener('DOMContentLoaded', () => {
    handlePageLoad();
    setupCardAnimation();
});

const handlePageLoad = () => {
    document.body.classList.remove('loading');
    loaderWrapper.style.display = 'none';
    updateUI();
};

const setupCardAnimation = () => {
    cardBtns.forEach(btn => btn.addEventListener('click', handleButtonClick));
    updateUI();
};

const handleButtonClick = (event) => {
    if (state.animating) return;
    state.animating = true;

    const target = event.currentTarget;
    const direction = target.classList.contains('btn--right') ? 1 : -1;
    state.currentIndex = (state.currentIndex + direction + cards.length) % cards.length;

    updateUI();
};



const updateUI = () => {
    cards.forEach((card, index) => {
        card.classList.remove('current--card', 'next--card', 'previous--card', 'hidden--card');

        if (index === state.currentIndex) {
            card.classList.add('current--card');
        } else if (index === (state.currentIndex + 1) % cards.length) {
            card.classList.add('next--card');
        } else if (index === (state.currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('previous--card');
        } else {
            card.classList.add('hidden--card');
        }
    });

    const currentCard = cards[state.currentIndex];
    currentCard.addEventListener('transitionend', () => {
        state.animating = false;
    }, { once: true });
};

/*js for responsive navbar */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click" , () =>{
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
}))
jQuery(document).ready(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (window.location.hash && isChrome) {
        setTimeout(function () {
            var hash = window.location.hash;
            window.location.hash = "";
            window.location.hash = hash;
        }, 300);
    }
});