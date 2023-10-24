let page = 0;

const apiKey = "29f6dab2e82da2c3abbb6017467bf0f2";

export function MovieList(isIncrement, genre, paintFunction) {
  isIncrement ? (page += 1) : page > 1 ? (page -= 1) : (page = 1);

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-Es&page=${page}${
      genre != -1 ? `&with_genres=${genre}` : ""
    }`
  )
    .then((response) => response.json())
    .then((result) => {
      paintFunction(result);
    });
}

export function MovieId(e, paintFunction) {
  let id = e.target.getAttribute("id");
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-Es`
  )
    .then((response) => response.json())
    .then((data) => paintFunction(data));
}

export function MovieTitle(title, paintFunction) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?language=es-Es&query=${title}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => paintFunction(data));
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
  return `https://image.tmdb.org/t/p/w1280${imagepath}`;
}

export function setPage(num) {
  page = num;
}
