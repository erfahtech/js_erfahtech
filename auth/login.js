import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

const validateInput = (inputId, validationFunction, validationMessageId, errorMessage) => {
  const inputElement = document.getElementById(inputId);
  const validationMessageElement = document.getElementById(validationMessageId);

  const validateAndDisplayMessage = () => {
    const inputValue = inputElement.value;

    // Check if the input is empty
    if (inputValue === "") {
      validationMessageElement.innerText = "";
      return;
    }

    const isValid = validationFunction(inputValue);

    if (!isValid) {
      validationMessageElement.innerText = errorMessage;
    } else {
      validationMessageElement.innerText = "";
    }
  };

  inputElement.addEventListener("input", validateAndDisplayMessage);

  // Handling input value deletion
  inputElement.addEventListener("change", validateAndDisplayMessage);
};

const validateLoginForm = () => {
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
    return false;
  }

  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  if (!isValidEmail || !isValidPassword) {
    loadingElement.style.display = "none";
    loginButton.style.display = "block";
    return false;
  }

  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  validateInput("emaillogin", validateEmail, "emailValidationMessage", 'Email: Harus mengandung "@" dan "."');
  validateInput("passwordlogin", validatePassword, "passwordValidationMessage", "Password: 8+ karakter, huruf & angka");

  // Add an event listener to input fields for the Enter key
  const inputFields = document.querySelectorAll('#emaillogin, #passwordlogin');
  inputFields.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        postLoginWithValidation();
      }
    });
  });

  // Retrieve Remember Me checkbox and email input
  const rememberMeCheckbox = document.getElementById("remember-me");
  const emailInput = document.getElementById("emaillogin");

  // Check if Remember Me is checked and populate email if available
  if (localStorage.getItem("rememberMeChecked") === "true") {
    rememberMeCheckbox.checked = true;
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      emailInput.value = savedEmail;
    }
  }

  // Add an event listener to Remember Me checkbox
  rememberMeCheckbox.addEventListener("change", () => {
    if (rememberMeCheckbox.checked) {
      // Save email to localStorage when Remember Me is checked
      localStorage.setItem("savedEmail", emailInput.value);
      localStorage.setItem("rememberMeChecked", "true");
    } else {
      // Clear saved email when Remember Me is unchecked
      localStorage.removeItem("savedEmail");
      localStorage.setItem("rememberMeChecked", "false");
    }
  });
});

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
      text: "Please fill in both email and password fields.",
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
    password,
  };

  postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData, () => {
    loadingElement.style.display = "none";
  });
};
window.postLogin = postLogin;

const postLoginWithValidation = () => {
  if (validateLoginForm()) {
    postLogin();
  }
};
window.postLoginWithValidation = postLoginWithValidation;

function responseData(result) {
  if (result.token) {
    setCookieWithExpireHour("token", result.token, 2);

    const loginButton = document.getElementById("buttonlogin");
    const email = getValue("emaillogin");
    const pesanlogin = result.message;

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
        localStorage.setItem("pesanlogin", pesanlogin);
      }
    });
  } else {
    const loadingElement = document.getElementById("loading");
    const loginButton = document.getElementById("buttonlogin");
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
    loginButton.style.display = "block";
    loadingElement.style.display = "none";
  }
}

const passwordFunc = () => {
  const x = document.getElementById("passwordlogin");
  const parent = x.parentNode;

  x.type = x.type === "password" ? "text" : "password";
  parent.classList.toggle("show", x.type === "text");
};
window.passwordFunc = passwordFunc;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
