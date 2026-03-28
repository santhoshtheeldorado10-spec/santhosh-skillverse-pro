const API_KEY = "c38efc7f"; // works for testing

const moviesDiv = document.getElementById("movies");
const favDiv = document.getElementById("favorites");
const loading = document.getElementById("loading");

let favs = JSON.parse(localStorage.getItem("favs")) || [];

// Search
document.getElementById("search").addEventListener("input", searchMovies);
document.getElementById("year").addEventListener("input", searchMovies);

async function searchMovies() {
  let q = document.getElementById("search").value;
  let y = document.getElementById("year").value;

  if (q.length < 2) return;

  loading.innerText = "Loading...";

  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}`;
  if (y) url += `&y=${y}`;

  let res = await fetch(url);
  let data = await res.json();

  loading.innerText = "";

  if (data.Response === "False") {
    moviesDiv.innerHTML = "No results";
    return;
  }

  showMovies(data.Search);
}

// Show movies
function showMovies(list) {
  moviesDiv.innerHTML = "";

  list.forEach((m) => {
    let poster =
      m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150x220";

    let isFav = favs.includes(m.imdbID);

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${poster}">
      <div class="info">
        <h4>${m.Title}</h4>
        <p>${m.Year}</p>
        <span class="fav">${isFav ? "❤️" : "🤍"}</span>
      </div>
    `;

    // Favorite
    div.querySelector(".fav").onclick = (e) => {
      e.stopPropagation();
      toggleFav(m);
    };

    moviesDiv.appendChild(div);
  });
}

// Favorites
function toggleFav(movie) {
  let index = favs.findIndex((f) => f.imdbID === movie.imdbID);

  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(movie);
  }

  localStorage.setItem("favs", JSON.stringify(favs));
  renderFavs();
}

// Render favorites
function renderFavs() {
  favDiv.innerHTML = "";

  favs.forEach((m) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${m.Poster}">
      <div class="info">
        <h4>${m.Title}</h4>
        <p>${m.Year}</p>
      </div>
    `;

    favDiv.appendChild(div);
  });
}

// Init
renderFavs();
