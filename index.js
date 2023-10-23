


document.getElementById("submit").addEventListener("click", async function (event) {
  event.preventDefault();

  const searchQuery = document.getElementById("movie-search").value;
  const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=b9dda53d`;

  const response = await fetch(url);
   const data = await response.json();

  if (data.Response === "False") {
    document.getElementById("bottom-section").innerHTML = `<h2>${data.Error}</h2>`;
  }
  else{
    const movieArray = data.Search.slice(0, 3);

    if (Array.isArray(movieArray)) 
    {
    const movieDetailsPromises = movieArray.map(async (movie) => {
      const imdbID = movie.imdbID;
      const movieDetailsUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=b9dda53d`;

      const movieDetailsResponse = await fetch(movieDetailsUrl);
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
          <button>Watchlist</button>
        </div>
        <p>${movie.Plot}</p>
      </div>
    </div>
    `).join('');

    document.getElementById("bottom-section").innerHTML = movieDetailsHTML;
    console.log(movieDetails);
    }
  }
});
