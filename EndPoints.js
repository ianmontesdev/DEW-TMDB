import Env from "./Env.js";

let page = 0;

export async function MovieList(isIncrement) {
  let data = "";

  isIncrement ? (page += 1) : page > 1 ? (page -= 1) : (page = 1);

  await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${Env.apiKey}&language=es-Es&page=${page}`
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
    });
  return data;
}

export function MovieId(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${Env.apiKey}&language=es-Es`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export function MovieImage(imagepath) {
  return `https://image.tmdb.org/t/p/w500${imagepath}`;
}
