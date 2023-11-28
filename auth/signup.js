import { getValue } from "https://jscroot.github.io/element/croot.js";

const validateForm = () => {
  const email = getValue("emailsignup");
  const phone = getValue("phonesignup");
  const username = getValue("usernamesignup");
  const password = getValue("passwordsignup");

  // Check if any of the fields are empty
  if (!email || !phone || !username || !password) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "Please fill in all fields.",
    });
    return false;
  }

  // Proceed with validation checks if all fields are not empty
  const emailIsValid = validateEmail(email);
  const phoneIsValid = validatePhone(phone);
  const usernameIsValid = validateUsername(username);
  const passwordIsValid = validatePassword(password);

  // Return true if all validations pass, otherwise return false
  return emailIsValid && phoneIsValid && usernameIsValid && passwordIsValid;
};

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^62\d{5,11}$/;
  return phoneRegex.test(phone);
};

const validateUsername = (username) => {
  const usernameRegex = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Function to validate input and display validation messages
const validateInput = (inputId, validationFunction, validationMessageId, errorMessage) => {
  const inputElement = document.getElementById(inputId);
  const validationMessageElement = document.getElementById(validationMessageId);

  const validateAndDisplayMessage = () => {
    const inputValue = inputElement.value;

    // Check if the input is empty
    if (inputValue === '') {
      validationMessageElement.innerText = '';
      return;
    }

    const isValid = validationFunction(inputValue);

    if (!isValid) {
      validationMessageElement.innerText = errorMessage;
    } else {
      validationMessageElement.innerText = '';
    }
  };

  inputElement.addEventListener('input', validateAndDisplayMessage);

  // Handling input value deletion
  inputElement.addEventListener('change', validateAndDisplayMessage);
};

// Document ready event
document.addEventListener('DOMContentLoaded', () => {
  // Validation for each input field
  validateInput('emailsignup', validateEmail, 'emailValidationMessage', 'Email: Harus mengandung "@" dan "."');
  validateInput('phonesignup', validatePhone, 'phoneValidationMessage', 'Nomor telepon diawali 62, 7-13 karakter');
  validateInput('usernamesignup', validateUsername, 'usernameValidationMessage', 'Username: dua kata, awalan huruf besar');
  validateInput('passwordsignup', validatePassword, 'passwordValidationMessage', 'Password: 8+ karakter, huruf & angka');
});

// Function to handle sign up
const postSignUp = () => {
  const email = getValue("emailsignup");
  const phonenumber = getValue("phonesignup");
  const username = getValue("usernamesignup");
  const password = getValue("passwordsignup");
  const loadingElement = document.getElementById("loading");

  loadingElement.style.display = "block";

  // Check if any of the fields are empty
  if (!email || !phonenumber || !username || !password) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: "Please fill in all fields.",
    });

    loadingElement.style.display = "none";
    return;
  }

  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-signup";
  const datainjson = {
    email,
    phonenumber,
    username,
    password,
  };

  fetch(target_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datainjson),
  })
    .then((response) => response.json())
    .then((result) => {
      responseData(result);
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
};

// Function to handle response after sign up
const responseData = (result) => {
  const loadingElement = document.getElementById("loading");

  if (result.status === true) {
    Swal.fire({
      icon: "success",
      title: "SignUp Successful",
      text: "You have successfully signed up.",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "login.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: result.message,
    });
    loadingElement.style.display = "none";
  }
};

// Function to toggle password visibility
const passwordFunc = () => {
  const x = document.getElementById("passwordsignup");
  const parent = x.parentNode;

  x.type = x.type === "password" ? "text" : "password";
  parent.classList.toggle("show", x.type === "text");
};

// Expose functions to the global scope
window.postSignUp = postSignUp;
window.passwordFunc = passwordFunc;

// Function to handle sign up with validation
const postSignUpWithValidation = () => {
  if (validateForm()) {
    postSignUp();
  }
};

// Expose function to the global scope
window.postSignUpWithValidation = postSignUpWithValidation;
