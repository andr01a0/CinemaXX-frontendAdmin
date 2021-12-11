import settings from "./settings.js";
import startRouter from "./router.js";

const myStorage = localStorage;

settings();
startRouter();
checkToken();

function checkToken() {
  if (myStorage.getItem("user") && isTokenValid()) {
    window.router.navigate("index.html");
  } else window.router.navigate("/login");
}

//Vesie
function isTokenValid() {
  const apiUrl = `${window.apiUrl}/api/authenticate/check-token`; //new endpoint to validate token from localStorage
  fetch(apiUrl, {
    body: JSON.stringify({
      token: localStorage.getItem("user"),
    }),
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((Response) => Response.json())
    .then((response) => {
      console.log(response.tokenStatus);
      if (response.tokenStatus === "valid") {
        window.alert(
          "You are already logged in. You are being redirected to movies."
        );
        window.router.navigate("/movies");
      }
    });
}
