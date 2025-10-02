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
