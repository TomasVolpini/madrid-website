function renderDistrictList(districts) {
  const ul = document.querySelector("#district-list-desktop ul");

  districts.forEach((dis) => {
    const li = document.createElement("li");
    li.innerText = `${dis.name}`;
    li.id = `${dis.id}`;
    ul.appendChild(li);
  });
  const districtsData = [...districts];
  mapHover(districtsData);
}

function mapHover(districtsData) {
  const paths = document.querySelectorAll("#map g#madrid-map g ");

  paths.forEach((path) => {
    const match = document.querySelector(
      `#district-list-desktop ul li#${path.id}`
    );
    const fill = path.querySelector("path.cls-3");

    path.addEventListener("mouseenter", () => {
      fill.classList.add("district-hover");
      match.classList.add("district-hover");
    });

    path.addEventListener("mouseleave", () => {
      fill.classList.remove("district-hover");
      match.classList.remove("district-hover");
    });

    match.addEventListener("mouseenter", () => {
      fill.classList.add("district-hover");
      match.classList.add("district-hover");
    });
    match.addEventListener("mouseleave", () => {
      fill.classList.remove("district-hover");
      match.classList.remove("district-hover");
    });

    path.addEventListener("click", () => {
      clicked = `${path.id}`;
      unclick();
      fill.classList.add("district-clicked");
      match.classList.add("district-clicked");
      clickedDistrict(districtsData, `${path.id}`);
    });

    match.addEventListener("click", () => {
      clicked = `${path.id}`;
      unclick();
      fill.classList.add("district-clicked");
      match.classList.add("district-clicked");
      clickedDistrict(districtsData, `${path.id}`);
    });
  });
}

function unclick() {
  const bye = document.querySelectorAll(".district-clicked");
  bye.forEach((click) => {
    click.classList.remove("district-clicked");
  });
}

let clicked = null;
function clickedDistrict(info, id) {
  const container = document.querySelector(
    "section#map-section #district-info"
  );
  container.innerHTML = "";

  const name = document.createElement("h3");
  const pop = document.createElement("p");
  const popExt = document.createElement("p");
  const barrios = document.createElement("p");
  const anchor = document.createElement("a");
  const districts = document.createElement("p");

  if (!clicked) {
    name.innerText = `${info.name}`;
    popExt.innerText = `Población de la CC.AA de Madrid: ${info.popExt.toLocaleString(
      "es-ES"
    )} hab.`;
    pop.innerText = `Población: ${info.population.toLocaleString(
      "es-ES"
    )} habitantes`;
    districts.innerText = `N° de distritos: ${info.ndistrict} `;
    barrios.innerText = `N° de barrios: ${info.nbarrios}`;

    container.appendChild(name);
    container.appendChild(pop);
    container.appendChild(popExt);
    container.appendChild(districts);
    container.appendChild(barrios);
  } else {
    const clickedDistrict = info.find((i) => i.id === id);

    name.innerText = `${clickedDistrict.name}`;
    pop.innerText = `Población: ${clickedDistrict.population.toLocaleString(
      "es-ES"
    )} habitantes`;
    barrios.innerText = `N° de barrios: ${clickedDistrict.barrios}`;
    anchor.innerText = "Ver página del distrito >";
    anchor.setAttribute("href", "#");
    container.appendChild(name);
    container.appendChild(pop);
    container.appendChild(barrios);
    container.appendChild(anchor);
  }
}

fetch("../json/map.json")
  .then((res) => res.json())
  .then((data) => {
    renderDistrictList(data.district);
    clickedDistrict(data, "");
  })
  .catch((error) => console.error(error));
