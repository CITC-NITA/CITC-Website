
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

const logo = document.querySelector(".logo");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

function myFunction(x) {
    if (x.matches) {
      
      document.querySelector(".logo img").setAttribute("src","../images/citc.png")
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

  const body = document.body;
  const toggleSwitch = document.getElementById('toggleSwitch');
  const colors = ['black-background', 'white-background'];
  let currentIndex = 0;
  
  toggleSwitch.addEventListener('change', function() {
      body.classList.remove(colors[currentIndex]);
      currentIndex = (currentIndex + 1) % colors.length;
      body.classList.add(colors[currentIndex]);
  });
  
  // Initialize the background to white
  body.classList.add('black-background');