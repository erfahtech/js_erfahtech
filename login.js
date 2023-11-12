import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

const postLogin = () => {
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
      text: "Please fill in both email and password fields."
    });
    loadingElement.style.display = "none";
    loginButton.style.display = "block";
    return;
  }



  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-login";
  const tokenkey = "token";
  const tokenvalue = "c49482e6de1fa07a349f354c2277e11bc7115297a40a1c09c52ef77b905d07c4";
  const datainjson = {
    email,
    password
  };

  postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData, () => {
    loadingElement.style.display = "none";
  });
}

function responseData(result) {
  if (result.token) {
    setCookieWithExpireHour("token", result.token, 2);

    const loginButton = document.getElementById("buttonlogin");

    loginButton.style.display = "none";

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have successfully logged in."
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "../user/dashboard.html";
      }
    });
  } else {
    const loadingElement = document.getElementById("loading");
    const loginButton = document.getElementById("buttonlogin");
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message
    });
    loginButton.style.display = "block";
    loadingElement.style.display = "none";
  }
}

window.postLogin = postLogin;
