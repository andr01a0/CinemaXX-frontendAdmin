export default async () => {
  const content = document.querySelector(".content");

  const loginResponse = await fetch("./pages/login/login.html");
  const loginHtml = await loginResponse.text();
  content.innerHTML = loginHtml;

  const form = document.querySelector("form");
  const errorMessage = document.querySelector(".error-message");

  form.addEventListener("submit", async (event) => {
    // Make sure the form is not submitted
    event.preventDefault();
    // endpoint for logging in
    const apiUrl = `${window.apiUrl}/api/authenticate/login`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: document.querySelector(".username").value,
          password: document.querySelector(".password").value,
        }),
      });

      if (!response.ok || response.status === 401) {
        errorMessage.style.display = "block";
        return;
      }

      const responseJson = await response.json();

      // Saving the JWT to local storage
      localStorage.setItem("user", responseJson.token);
      window.router.navigate("/");
    } catch {}
  });
};
