gsap.registerPlugin(MorphSVGPlugin);

const tp = document.getElementById("bubbles-template");
const sc = document.getElementById("services-section");

function renderBubbles(servicios) {
  servicios.forEach((servicio) => {
    const clone = tp.content.cloneNode(true);

    clone.querySelector("span").textContent = servicio.icon;
    clone.querySelector(".service-name").textContent = servicio.name;

    // assign unique IDs to circle + spikes
    const spikesEl = clone.querySelector("path.bubble-spikes");
    const circleEl = clone.querySelector("circle.bubble-circle");

    spikesEl.id = `spikes-${servicio.id}`;
    circleEl.id = `circle-${servicio.id}`;

    sc.appendChild(clone);
    MorphSVGPlugin.convertToPath(circleEl);

    // create a paused morph tween for this bubble
    const morph = gsap.to(`#circle-${servicio.id}`, {
      duration: 0.25,
      morphSVG: `#spikes-${servicio.id}`,
      paused: true,
      ease: "power1.inOut",
    });

    circleEl.addEventListener("mouseenter", () => morph.play());
    circleEl.addEventListener("mouseleave", () => morph.reverse());
  });
}

fetch("../json/services.json")
  .then((res) => res.json())
  .then((data) => renderBubbles(data.services))
  .catch((error) => console.error(error));
