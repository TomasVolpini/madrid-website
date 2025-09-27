import {
  dateFilter,
  dateFilter1,
  dateFilter2,
  dateFilter3,
  dateFilter4,
  dateFilter5,
  dateFilter6,
} from "./calendar.js";

const filters = {
  0: dateFilter,
  1: dateFilter1,
  2: dateFilter2,
  3: dateFilter3,
  4: dateFilter4,
  5: dateFilter5,
  6: dateFilter6,
};

// [Regarding code above] In order for the date filtering feature to be independent of the moment the page is viewed, the identifying dates of the events will be hardcoded.

function renderEvents(events) {
  const tp = document.getElementById("events-template");
  const etp = document.getElementById("empty-event-template");
  const ct = document.getElementById("events-container");
  const card = document.querySelectorAll(".event-card");

  card.forEach((c) => {
    c.remove();
  });
  let eventsLots = 6;
  events.forEach((event) => {
    const clone = tp.content.cloneNode(true);

    clone
      .querySelector(".event-thumb")
      .setAttribute("src", `./img/events/${event.thumbnail}`);
    clone.querySelector(".event-thumb").setAttribute("alt", event.alt);
    clone.querySelector("p.event-head").textContent = event.heading;
    // clone.querySelector(".event-card").classList.add(String(filters[event.id]));

    if (event.date >= dateFilter) {
      ct.appendChild(clone);
      eventsLots--;
      // console.log(dateFilter, event.date);
    }
  });

  console.log(eventsLots);

  if (eventsLots > 0) {
    for (let i = 0; i < eventsLots; i++) {
      const empty = etp.content.cloneNode(true);
      ct.appendChild(empty);
    }
  }

  // console.log("next");
}

function fetchEvents() {
  fetch("../json/events.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        data.date = filters[data.id];
      });
      renderEvents(data);
    })
    .catch((error) => console.error(error));
}

let eventDay = document.querySelectorAll("div.day");

function catchDays() {
  eventDay = document.querySelectorAll("div.day");
  console.log(eventDay);
}

function fetchInit() {
  eventDay.forEach((day) => {
    day.addEventListener("click", () => {
      fetchEvents();
    });
  });
}

function initButtons() {
  fetchInit();

  document.getElementById("nextButton").addEventListener("click", () => {
    catchDays();
    fetchInit();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    catchDays();
    fetchInit();
  });

  document.getElementById("refreshCalendar").addEventListener("click", () => {
    catchDays();
    fetchEvents();
    fetchInit();
  });
}

initButtons();
fetchEvents();

document.getElementById("console").addEventListener("click", () => {
  console.log("events dateFilter", dateFilter);
  console.log("events", eventDay);
});
