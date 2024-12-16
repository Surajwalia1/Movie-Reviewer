// const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e258e957a12d8573d72a1ab47d78eeb8&page=1';
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=e258e957a12d8573d72a1ab47d78eeb8&query=";

// const APILINK = "http://www.omdbapi.com/?apikey=888e4439&page=1";
// const IMG_PATH = "http://img.omdbapi.com/?apikey=888e4439"; // Not needed
// const APILINK = "http://www.omdbapi.com/?apikey=888e4439&s=horrer"; // Initial search query to fetch multiple movies
// const SEARCHAPI = "http://www.omdbapi.com/?apikey=888e4439&s=";

const APIKEY = "888e4439";
const keywords = ["batman", "superman", "star wars", "harry potter", "avengers", "spiderman"];
const SEARCHAPI = `http://www.omdbapi.com/?apikey=${APIKEY}&s=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function getRandomKeyword() {
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}

function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function(data) {
      main.innerHTML = ''; // Clear previous results
      if (data.Search) {
        data.Search.forEach((element) => {
          const div_card = document.createElement('div');
          div_card.setAttribute('class', 'card');

          const div_row = document.createElement('div');
          div_row.setAttribute('class', 'row');

          const div_column = document.createElement('div');
          div_column.setAttribute('class', 'column');

          const image = document.createElement('img');
          image.setAttribute('class', 'thumbnail');
          image.setAttribute('id', 'image');

          const title = document.createElement('h3');
          title.setAttribute('id', 'title');

          const center = document.createElement('center');

          title.innerHTML = `${element.Title}`;
          image.src = element.Poster !== "N/A" ? element.Poster : 'placeholder.jpg';

          center.appendChild(image);
          div_card.appendChild(center);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);

          main.appendChild(div_row);
        });
      } else {
        main.innerHTML = "<h3>No results found</h3>";
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});

// Fetch random movies on page load
const randomKeyword = getRandomKeyword();
returnMovies(SEARCHAPI + randomKeyword);
