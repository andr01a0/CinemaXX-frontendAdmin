export default () => {
  const content = document.querySelector(".content");

  return fetch("./pages/main/main.html")
    .then((response) => response.text())
    .then((mainHtml) => {
      content.innerHTML = mainHtml;

      fetch(`${window.apiUrl}/api/movie/`)
        .then((Response) => Response.json())
        .then((movies) => console.log(movies));
    });
};
