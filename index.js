import {
  MovieList,
  MovieId,
  MovieImage,
  GenreList,
  setPage,
} from "./EndPoints.js";
let incrementBtn = document.querySelectorAll(".increment-btn");
let decrementBtn = document.querySelectorAll(".decrement-btn");
let container = document.querySelector("#container");
let genreList = document.querySelector("#genre-list");
let pages = document.querySelectorAll("p span");
let genreFilter = -1;

function paintMovies(movies) {
  container.innerHTML = "";
  pages.forEach((page) => {
    page.textContent = `Page ${movies.page} of ${movies.total_pages}`;
  });

  movies.results.forEach((movie) => {
    let article = document.createElement("article");
    let header = document.createElement("header");
    let footer = document.createElement("footer");
    let img = document.createElement("img");
    let span = document.createElement("span");
    img.setAttribute("src", MovieImage(movie.poster_path));
    span.textContent = movie.title;

    article.appendChild(header.appendChild(img));
    article.appendChild(footer.appendChild(span));

    container.appendChild(article);
  });
}

async function paintList() {
  let data;
  await GenreList().then((genres) => {
    data = genres.genres;
  });

  data.forEach((genre) => {
    let span = document.createElement("span");
    span.setAttribute("id", genre.id);
    span.textContent = genre.name;
    console.log(genreFilter);
    span.addEventListener("click", (e) => {
      genreFilter = e.target.getAttribute("id");
      setPage(0);
      MovieList(true, genreFilter, paintMovies);
    });
    genreList.appendChild(span);
  });
  removeBtns;
  loadBtns();
}

paintList();
MovieList(true, genreFilter, paintMovies);

function loadBtns() {
  incrementBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      MovieList(true, genreFilter, paintMovies);
    });
  });

  decrementBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      MovieList(false, genreFilter, paintMovies);
    });
  });
}

function removeBtns() {
  incrementBtn.forEach((btn) => {
    btn.removeEventListener("click", () => {
      MovieList(true, genreFilter, paintMovies);
    });
  });

  decrementBtn.forEach((btn) => {
    btn.removeEventListener("click", () => {
      MovieList(false, genreFilter, paintMovies);
    });
  });
}
