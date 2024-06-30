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









  
  
//   var x = window.matchMedia("(max-width: 576px)");
  
//   myFunction(x);
  
//   x.addEventListener("change", function () {
//     myFunction(x);
// });


function myFunction(x) {
    if (x.matches) {
      document.querySelector(".logo img").setAttribute("src","../images/newlogo3.png")
    }
    else{
        document.querySelector(".logo img").setAttribute("src","../images/Logo.png")
    }
}
  
  
  var x = window.matchMedia("(max-width: 576px)");

  myFunction(x);

  x.addEventListener("change", function () {
    myFunction(x);
  });





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


  
const body = document.body;
const toggleSwitch = document.getElementById('toggleSwitch');
const colors = ['white-background', 'black-background'];
let currentIndex = 0;

toggleSwitch.addEventListener('change', function() {
    body.classList.remove(colors[currentIndex]);
    currentIndex = (currentIndex + 1) % colors.length;
    body.classList.add(colors[currentIndex]);
});

// Initialize the background to white
body.classList.add('white-background');





