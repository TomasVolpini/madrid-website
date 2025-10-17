document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".header-index");
  const hero = document.querySelector(".hero");
  const vh = window.innerHeight / 100;

  const heroBottom = hero.offsetHeight - 40 * vh;

  window.addEventListener("scroll", () => {
    if (window.scrollY < heroBottom) {
      // Estamos dentro del hero → navbar fija
      navbar.style.position = "fixed";
      navbar.style.top = "0";
      navbar.style.width = "100%";
    } else {
      // Scroll pasó el hero → navbar sigue en flujo normal
      navbar.style.position = "absolute";
      navbar.style.top = `${heroBottom}px`;
    }
  });
});

const button = document.getElementById("collapsed-menu");
const symbol = document.querySelector("#collapsed-menu span");
const menuList = document.getElementById("nav-list");
const li = document.querySelectorAll("#nav-list li");
const navbar = document.querySelector("nav");
const overlay = document.createElement("div");
overlay.id = "nav-overlay";
navbar.appendChild(overlay);

li.forEach((l) => {
  l.addEventListener("click", () => {
    menuList.classList.remove("active");
    overlay.classList.remove("active");
    symbol.innerHTML = "menu";
  });
});

button.addEventListener("click", () => {
  menuList.classList.toggle("active");
  overlay.classList.toggle("active");
  if (menuList.classList.contains("active")) {
    symbol.innerHTML = "close";
  } else {
    symbol.innerHTML = "menu";
  }
});

overlay.addEventListener("click", () => {
  menuList.classList.remove("active");
  overlay.classList.remove("active");
  symbol.innerHTML = "menu";
});
