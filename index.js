import { MovieList, MovieId, MovieImage } from "./EndPoints.js";

let container = document.querySelector("#container");
let pages = document.querySelector("p span");

function paintMovies(isIncrement) {
  container.textContent = "";

  MovieList(isIncrement).then((movies) => {
    pages.textContent = `Page ${movies.page} of ${movies.total_pages}`;
    console.log(movies);

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

paintMovies(true);

let incrementBtn = document
  .querySelector("#increment-btn")
  .addEventListener("click", () => {
    paintMovies(true);
  });

let decrementBtn = document
  .querySelector("#decrement-btn")
  .addEventListener("click", () => {
    paintMovies(false);
  });
