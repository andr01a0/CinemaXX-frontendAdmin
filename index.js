import settings from "./settings.js";
import startRouter from "./router.js";

settings();
startRouter();

const myStorage = localStorage;
function checkToken() {
  if (myStorage.getItem("user") && isTokenValid()) {
    window.router.navigate('index.html');
  } else window.router.navigate('/login');
}

//Vesie
function isTokenValid() {
  const apiUrl = "url"; //new endpoint to validate token from localStorage
  fetch(apiUrl)
    .then((Response) => Response.json())
    .then((response) => console.log(response.tokenStatus));
}
