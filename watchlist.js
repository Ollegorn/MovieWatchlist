

function renderWatchlist(watchlist) {
  let watchlistHTML = "";
    
  if (watchlist.length === 0) {
    watchlistHTML = `
        <div class="add-movie-to-watchlist">
          <h2>Nothing here :/</h2>
          <a href="./index.html">Add something to your watchlist!</a> 
        </div>
      `
  } else {
    
  watchlistHTML = watchlist.map((movie) => `
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
            <button class="watchlist" data-imdb="${movie.imdbID}">➖ Remove</button>
          </div>
          <div class="movie-plot">
            <p>${movie.Plot}</p>
            <button class="show-more">Show More</button>
          </div>

        </div>
      </div>
    `).join('');
  }

  document.getElementById("bottom-section").innerHTML = watchlistHTML;

  //adding event listener to button
  const minusButtons = document.getElementsByClassName("watchlist");
  for (const button of minusButtons) {
    button.addEventListener("click", function () {
      const imdbID = this.getAttribute("data-imdb");
      const index = watchlist.findIndex((item) => item.imdbID === imdbID);

      if (index !== -1) {
        watchlist.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        renderWatchlist(watchlist);
      }
    });
  }
}

const showMoreButtons = document.getElementsByClassName("show-more");
for (const button of showMoreButtons) {
  button.addEventListener("click", function () {
    const plot = this.previousElementSibling; // Get the plot element

    if (plot.style.maxHeight) {
      plot.style.maxHeight = null;
      this.innerHTML = "Show Less";
    } else {
      plot.style.maxHeight = "100px"; // Adjust the value as needed
      this.innerHTML = "Show More";
    }
  });
}

//init watchlist
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
renderWatchlist(watchlist);

  