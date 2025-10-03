function renderBubbles(servicios) {
  const tp = document.getElementById("bubbles-template");
  const ct = document.getElementById("bubbles-container");

  servicios.forEach((servicio) => {
    const clone = tp.content.cloneNode(true);

    clone.querySelector("span").textContent = servicio.icon;
    clone.querySelector(".service-name").innerHTML = servicio.name;

    const spikesEl = clone.querySelector("path.bubble-spikes");
    const circleEl = clone.querySelector("circle.bubble-circle");

    spikesEl.id = `spikes-${servicio.id}`;
    circleEl.id = `circle-${servicio.id}`;

    if (servicio.offCenter) {
      clone.querySelector("span").classList.add("offCenter");
    }

    ct.appendChild(clone);
  });
}

function morphBubbles(servicios) {
  gsap.registerPlugin(MorphSVGPlugin);
  servicios.forEach((servicio) => {
    const circle = document.querySelector(`#circle-${servicio.id}`);
    MorphSVGPlugin.convertToPath(circle);

    const morph = gsap.to(`#circle-${servicio.id}`, {
      duration: 0.25,
      morphSVG: `#spikes-${servicio.id}`,
      paused: true,
    });

    const circleNew = document.querySelector(`#circle-${servicio.id}`);
    circleNew.addEventListener("mouseenter", () => morph.play());
    circleNew.addEventListener("mouseleave", () => morph.reverse());
  });
}

fetch("./json/services.json")
  .then((res) => res.json())
  .then((data) => {
    renderBubbles(data.services);
    morphBubbles(data.services);
  })
  .catch((error) => console.error(error));
