import {
  MovieList,
  MovieId,
  MovieTitle,
  MovieImage,
  GenreList,
  setPage,
} from "./EndPoints.js";
let incrementBtn = document.querySelectorAll(".increment-btn");
let decrementBtn = document.querySelectorAll(".decrement-btn");
let container = document.querySelector("#container");
let genreList = document.querySelector("#genre-list");
let pages = document.querySelectorAll("p span");
let searchBar = document.querySelector("input");

searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onSearch();
  }
});
let searchBtn = document
  .querySelector("#search-btn")
  .addEventListener("click", () => {
    onSearch();
  });

let genreFilter = -1;

function onSearch() {
  MovieTitle(searchBar.value, paintMovies);
}

function createModal(movie) {
  console.log(movie);
  let aside = document.createElement("aside");
  let dialog = document.createElement("dialog");
  let closeBtn = document.createElement("i");
  let image = document.createElement("img");
  let description = document.createElement("p");
  image.src = MovieImage(movie.backdrop_path);
  closeBtn.classList.add("fa-solid");
  closeBtn.classList.add("fa-xmark");
  closeBtn.setAttribute("id", "close-modal");
  closeBtn.addEventListener("click", deleteModal);
  description.textContent = movie.overview;
  dialog.open = true;
  dialog.appendChild(image);
  dialog.appendChild(description);
  dialog.appendChild(closeBtn);
  aside.appendChild(dialog);
  document.body.appendChild(aside);
}

function deleteModal() {
  document.querySelector("aside").remove();
}

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
    img.setAttribute("id", movie.id);
    img.addEventListener("click", (e) => {
      MovieId(e, createModal);
    });
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
