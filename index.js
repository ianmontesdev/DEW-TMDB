import {
  MovieList,
  MovieId,
  MovieImage,
  GenreList,
  setPage,
} from "./EndPoints.js";
let incrementBtn = document.querySelector("#increment-btn");
let decrementBtn = document.querySelector("#decrement-btn");
let container = document.querySelector("#container");
let genreList = document.querySelector("#genre-list");
let pages = document.querySelector("p span");
let genreFilter = -1;

function paintMovies(isIncrement, genre) {
  container.innerHTML = "";

  MovieList(isIncrement, genre).then((movies) => {
    pages.textContent = `Page ${movies.page} of ${movies.total_pages}`;

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
      paintMovies(true, e.target.getAttribute("id"));
    });
    genreList.appendChild(span);
  });
  removeBtns;
  loadBtns();
}

paintList();
paintMovies(true, genreFilter);

function loadBtns() {
  incrementBtn.addEventListener("click", () => {
    paintMovies(true, genreFilter);
  });

  decrementBtn.addEventListener("click", () => {
    alert(genreFilter);
    paintMovies(false, genreFilter);
  });
}

function removeBtns() {
  incrementBtn.removeEventListener("click", () => {
    paintMovies(true, genreFilter);
  });

  decrementBtn.removeEventListener("click", () => {
    alert(genreFilter);
    paintMovies(false, genreFilter);
  });
}
