let page = 0;

const apiKey = "29f6dab2e82da2c3abbb6017467bf0f2";

export async function MovieList(isIncrement, genre) {
  let data;

  isIncrement ? (page += 1) : page > 1 ? (page -= 1) : (page = 1);
  console.log(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-Es${
      genre != -1 ? `&with_genres=${genre}` : ""
    }&page=${page}`
  );

  await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      Env.apiKey
    }&language=es-Es&page=${page}${genre != -1 ? `&with_genres=${genre}` : ""}`
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
    });
  return data;
}

export function MovieId(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-Es`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export async function GenreList() {
  let data;
  await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=29f6dab2e82da2c3abbb6017467bf0f2&language=es-Es`
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
    });
  return data;
}

export function MovieImage(imagepath) {
  return `https://image.tmdb.org/t/p/w500${imagepath}`;
}

export function setPage(num) {
  page = num;
}
