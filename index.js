/*
let movieList = []

function renderMovies() {
  let html = ""
  for (let movie of movieList){
    html += `<h3>${movie}</h3>`
  }
  document.getElementById("bottom-section").innerHTML = html
}





fetch("http://www.omdbapi.com/?t=Frozen&apikey=b9dda53d")
.then(response => response.json())
.then(data => {
  movieList = data
  renderMovies()
})



fetch("http://www.omdbapi.com/?t=Frozen&apikey=b9dda53d")
.then(res => res.json())
.then(data => {
  document.getElementById("bottom-section").innerHTML = `<p>${data.Title}</p>`;
})
*/

document.getElementById("submit").addEventListener("click", function(event){
  event.preventDefault()

  const searchQuery = document.getElementById("movie-search").value;  
  const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=b9dda53d`;
  
  fetch(url)
  .then(res => res.json())
  .then(data => {
    
    const movieArray = data.Search.slice(0,3)

    if (Array.isArray(movieArray)){
      const content = movieArray.map((movie) => `
        <div class="movie">
          <img src="${movie.Poster}">
          <p>Title: ${movie.Title}</p>
          <p>Year: ${movie.Year}</p>
        </div>
      `).join("")

      document.getElementById("bottom-section").innerHTML = content
    }
    if (data.Response === "False"){
      document.getElementById("bottom-section").innerHTML = `<h2>${data.Error}</h2>`
    }
    console.log(data)
  })
})