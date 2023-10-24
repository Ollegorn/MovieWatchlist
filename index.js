
document.getElementById("submit").addEventListener("click", async function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById("movie-search").value;

  const response = await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=b9dda53d`);
  const data = await response.json();

  if (data.Response === "False") {
    document.getElementById("bottom-section").innerHTML = `<h2>${data.Error}</h2>`;
  }
  else{
    const movieArray = data.Search.slice(0, 5);

    const movieDetailsPromises = movieArray.map(async (movie) => {
      const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=b9dda53d`);
      const movieDetailsData = await movieDetailsResponse.json();

      return movieDetailsData;
    });

    const movieDetails = await Promise.all(movieDetailsPromises);

    const movieDetailsHTML = movieDetails.map((movie) => `
      <div class="movie">
        <img src="${movie.Poster}">
        <div class="movie-details">
          <div class="movie-comp">
            <p>${movie.Title}</p>
            <i class="fa-solid fa-star" style="color: #f7c202;"></i>
            <p>${movie.imdbRating}</p>
          </div>
          <div class="movie-comp">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>
            <button class="plus" data-imdb="${movie.imdbID}">➕Watchlist</button>
          </div>
          <p>${movie.Plot}</p>
        </div>
      </div>
    `).join('');

    document.getElementById("bottom-section").innerHTML = movieDetailsHTML;

    const watchlistButtons = document.getElementsByClassName("plus");
    for (const button of watchlistButtons){
      button.addEventListener("click", function(){
        const imdbID = this.getAttribute("data-imdb");
        const movie = movieDetails.find((item) => item.imdbID === imdbID);

        if (movie) {
          let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

          if (!watchlist.some((item) => item.imdbID === imdbID)){
            watchlist.push(movie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            alert(`${movie.Title} has been added to your watchlist!`)
          }
        }
      });
    }
  }
});

