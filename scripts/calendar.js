//https://www.youtube.com/watch?v=m9OSBJaQTlM

let nav = 0;
let clicked = new Date();
let selectedDaySquare = null;
let dateFilter = 0;

let dateFilter1,
  dateFilter2,
  dateFilter3,
  dateFilter4,
  dateFilter5,
  dateFilter6;

const calendar = document.getElementById("calendar-days");

const weekdays = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  const calendarGrid = 42;
  const restOfCalendar = calendarGrid - paddingDays - daysInMonth;

  document.getElementById("monthDisplay").innerText = `${dt
    .toLocaleDateString("es-ES", { month: "short" })
    .toUpperCase()} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth + restOfCalendar; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays && i <= daysInMonth + paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if ((i < day + paddingDays && nav === 0) || nav < 0) {
        daySquare.classList.add("day-past");
      }
    } else {
      daySquare.classList.add("empty-day");
    }

    calendar.appendChild(daySquare);

    daySquare.addEventListener("click", () => {
      clicked = new Date(year, month, i - paddingDays);
      renderDate();

      if (selectedDaySquare) selectedDaySquare.classList.remove("selected-day");

      daySquare.classList.add("selected-day");
      selectedDaySquare = daySquare;
      // console.log(dateFilter, dateFilter1);
    });
  }
}

function renderDate() {
  const datesDiv = document.getElementById("date-showcase");

  const parts = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).formatToParts(clicked);

  const weekday = parts.find((p) => p.type === "weekday").value;
  const day = parts.find((p) => p.type === "day").value;
  const month = parts.find((p) => p.type === "month").value;

  datesDiv.innerHTML = `${weekday}  ${day}  ${month}`;

  const partsFilter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(clicked);

  const yearFilter = partsFilter
    .find((p) => p.type === "year")
    .value.toString();

  const monthFilter = partsFilter
    .find((p) => p.type === "month")
    .value.toString();

  const dayFilter = partsFilter.find((p) => p.type === "day").value.toString();

  dateFilter = parseInt(yearFilter + monthFilter + dayFilter);
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("refreshCalendar").addEventListener("click", () => {
    nav = 0;
    clicked = new Date();
    load();
    renderDate();
  });
}

initButtons();
load();
renderDate();

dateFilter1 = dateFilter;
dateFilter2 = dateFilter1 + 1;
dateFilter3 = dateFilter2 + 1;
dateFilter4 = dateFilter3 + 1;
dateFilter5 = dateFilter4 + 1;
dateFilter6 = dateFilter5 + 1;

export {
  dateFilter,
  dateFilter1,
  dateFilter2,
  dateFilter3,
  dateFilter4,
  dateFilter5,
  dateFilter6,
};

// Este solo tiene que ser a partir de la fecha original, no se deben rehacer todo el tiempo ARREGLAR

// In order for the date filtering feature to be independent of the moment the page is viewed, the identifying dates of the events will be hardcoded.
