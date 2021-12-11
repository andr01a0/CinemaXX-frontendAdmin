import settings from "./settings.js";
import startRouter from "./router.js";

const myStorage = localStorage;

settings();
startRouter();
addLogoutHandler();

function addLogoutHandler() {
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.router.navigate("/login");
  });
}

export async function checkToken() {
  const logoutButton = document.querySelector(".logoutButton");
  if (!myStorage.getItem("user") || !(await isTokenValid())) {
    logoutButton.style.visibility = "hidden";
    window.router.navigate("/login");
  } else logoutButton.style.visibility = "visible";
}

//Vesie
async function isTokenValid() {
  const apiUrl = `${window.apiUrl}/api/authenticate/check-token`; //new endpoint to validate token from localStorage
  const response = await fetch(apiUrl, {
    body: JSON.stringify({
      token: localStorage.getItem("user"),
    }),
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const responseJSON = await response.json();
  return responseJSON.tokenStatus === "valid";
}
