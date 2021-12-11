export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/addMovie/addMovie.html")
    .then((response) => response.text())
    .then((moviesHtml) => {
      content.innerHTML = moviesHtml;

      const form = document.querySelector("form");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        let movieUrl = `${window.apiUrl}/api/movie`;

        fetch(movieUrl, {
          method: "POST",
          body: JSON.stringify({
            title: document.querySelector("#movieTitle").value,
            description: document.querySelector("#movie-desc").value,
            ageRestriction: document.querySelector("#age").value,
            startDate: document.querySelector("#movie-start-date").value,
            endDate: document.querySelector("#movie-end-date").value,
            rating: document.querySelector("#movie-rating").value,
            poster: document.querySelector("#movie-poster").value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((Response) => Response.json())
          .then(({ message }) => {
            alert(message);
            window.router.navigate("/movies");
            //location.reload();
          });
      });
    });
};
