export default async (movieId) => {
  const content = document.querySelector(".content");
  const response = await fetch("./pages/movie/edit.html");
  const innerMoviesHtml = await response.text();
  content.innerHTML = innerMoviesHtml;

  const getMovieResponse = await fetch(`${window.apiUrl}/api/movie/${movieId}`);
  const getMovieData = await getMovieResponse.json();

  document.querySelector("#movieTitle").value = getMovieData.title;
  document.querySelector("#movie-desc").value = getMovieData.description;
  document.querySelector("#age").value = getMovieData.ageRestriction;
  document.querySelector("#movie-start-date").value = getMovieData.startDate;
  document.querySelector("#movie-end-date").value = getMovieData.endDate;
  document.querySelector("#movie-rating").value = getMovieData.rating;
  document.querySelector("#movie-poster").value = getMovieData.poster;

  const button = document.querySelector("button");
  button.addEventListener("click", async () => {
    const movieUrl = `${window.apiUrl}/api/movie`;
    const movieResponse = await fetch(movieUrl, {
      method: "PUT",
      body: JSON.stringify({
        movieId,
        title: document.querySelector("#movieTitle").value,
        ageRestriction: document.querySelector("#age").value,
        description: document.querySelector("#movie-desc").value,
        startDate: document.querySelector("#movie-start-date").value,
        endDate: document.querySelector("#movie-end-date").value,
        rating: document.querySelector("#movie-rating").value,
        poster: document.querySelector("#movie-poster").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const { message } = await movieResponse.json();
    alert(message);
    location.href = "#/movies";
  });
};
