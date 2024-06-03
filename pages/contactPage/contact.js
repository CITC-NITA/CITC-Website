/*responsive navbar*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const logo = document.querySelector(".logo");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click" , () =>{
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
}))



function myFunction(x) {
  if (x.matches) {
    
    document.querySelector(".logo img").setAttribute("src","../images/citc.png")
  }
  else{
      document.querySelector(".logo img").setAttribute("src","../images/logo.png")
  }
}


var x = window.matchMedia("(max-width: 576px)");

myFunction(x);

x.addEventListener("change", function () {
  myFunction(x);
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: true,
    fade: true,
    grabCursor: true,
    autoplay: {
      delay: 3, // Minimal delay to create continuous effect
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
    speed: 8000, // Speed of transition in milliseconds
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });
});

