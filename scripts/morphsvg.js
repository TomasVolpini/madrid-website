gsap.registerPlugin(MorphSVGPlugin);
MorphSVGPlugin.convertToPath("#circle");

document.querySelectorAll(".service-bubble").forEach((bubble) => {
  const circle = bubble.querySelector("#circle");
  const spikes = bubble.querySelector("#spikes");

  const morph = gsap.to(circle, {
    duration: 0.25,
    morphSVG: spikes,
    paused: true,
  });

  circle.addEventListener("mouseenter", () => morph.play());
  circle.addEventListener("mouseleave", () => morph.reverse());
});
