function renderNews(news) {
  const tp = document.getElementById("news-template");
  const ct = document.getElementById("news-container");

  news.forEach((nw) => {
    const clone = tp.content.cloneNode(true);

    clone
      .querySelector(".news-thumb")
      .setAttribute("src", `./img/news/${nw.thumbnail}`);
    clone.querySelector(".news-thumb").setAttribute("alt", nw.alt);
    clone.querySelector("p.news-head").textContent = nw.heading;

    ct.appendChild(clone);
  });
}

fetch("../json/news.json")
  .then((res) => res.json())
  .then((data) => {
    renderNews(data);
  })
  .catch((error) => console.error(error));
