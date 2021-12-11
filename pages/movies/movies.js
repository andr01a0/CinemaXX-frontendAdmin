export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/movies/movies.html")
    .then((response) => response.text())
    .then((moviesHtml) => {
      content.innerHTML = moviesHtml;

      // Button to add movie
      const addMovieContainer = document.querySelector(".add-movie");
      const addButton = document.createElement("button");
      addButton.textContent = "Movie";
      addMovieContainer.appendChild(addButton);
      addButton.addEventListener("click", function () {
        window.router.navigate("/addMovie");
      });

      // Create movie list
      fetch(
        `${window.apiUrl}/api/movie?startRange=2021-10-01&endRange=2021-12-31`
      )
        .then((response) => response.json())
        .then((movies) => {
          const movieContainer = document.querySelector(".movie-container");

          // Movie title in table
          movies.forEach((movie) => {
            const movieTable = document.querySelector(".table");
            const movieRow = document.createElement("tr");
            movieTable.appendChild(movieRow);
            const movieCol = document.createElement("td");
            movieRow.appendChild(movieCol);
            movieRow.textContent = movie.title;

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            const editCol = document.createElement("td");
            editCol.appendChild(editButton);
            movieRow.appendChild(editCol);
            editButton.addEventListener("click", function () {
              window.router.navigate(`movie/${movie.movieId}/edit`);
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            const deleteCol = document.createElement("td");
            deleteCol.appendChild(deleteButton);
            movieRow.appendChild(deleteCol);
            deleteButton.addEventListener("click", async function () {
              const deleteResponse = await fetch(
                `${window.apiUrl}/api/movie/${movie.movieId}`,
                { method: "delete" }
              );
              const { message } = await deleteResponse.json();
              alert(message);
              window.router.navigate("/movies");
              location.reload();
            });
          });
        });
    });
};
