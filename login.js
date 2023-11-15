import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

const postLogin = async () => {
  const email = getValue("emaillogin");
  const password = getValue("passwordlogin");
  const loadingElement = document.getElementById("loading");
  const loginButton = document.getElementById("buttonlogin");

  loginButton.style.display = "none";
  loadingElement.style.display = "block";

  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please fill in both email and password fields.",
    });

    loadingElement.style.display = "none";
    loginButton.style.display = "block";
    return;
  }

  const targetUrl = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-login";
  const tokenKey = "token";
  const tokenValue = "c49482e6de1fa07a349f354c2277e11bc7115297a40a1c09c52ef77b905d07c4";
  const dataInJson = {
    email,
    password,
  };

  try {
    const result = await postWithToken(targetUrl, tokenKey, tokenValue, dataInJson);
    responseData(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadingElement.style.display = "none";
  }
};

const responseData = (result) => {
  const loadingElement = document.getElementById("loading");
  const loginButton = document.getElementById("buttonlogin");

  if (result.token) {
    setCookieWithExpireHour("token", result.token, 2);

    const email = getValue("emaillogin");

    loginButton.style.display = "none";

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have successfully logged in.",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "../user/dashboard.html";
        // Store the email in localStorage
        localStorage.setItem("userEmail", email);
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });

    loginButton.style.display = "block";
  }

  loadingElement.style.display = "none";
};

window.postLogin = postLogin;
