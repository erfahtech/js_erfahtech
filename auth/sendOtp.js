// sendOtp.js

function SendOTP() {
  // Get the email input value
  const emailInput = document.getElementById("email").value;

  // Validate the email (you may want to add more validation)
  if (!isValidEmail(emailInput)) {
    // Display an error message
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Silakan masukkan email yang valid.",
    });
    return;
  }

  // Prepare the data to send in the request
  const data = {
    email: emailInput,
  };

  // Make a POST request to your API endpoint
  fetch("https://asia-southeast2-urse-project.cloudfunctions.net/urse-sendotp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Check if the status is true
      if (data.status) {
        // Store the email in localStorage
        localStorage.setItem("sentEmail", emailInput);

        // Display a success message
        Swal.fire({
          icon: "success",
          title: "OTP Terkirim",
          text: `Perikas WhatsApp Anda untuk melihat OTP.`,
          timer: 5000,
        }).then(() => {
          // Redirect the user to the OTP verification page
          window.location.href = "verifyotp.html";
        });
      } else {
        // Display an error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Gagal mengirim OTP. Email tidak terdaftar.`,
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      // Display an error message if there is a network issue
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Gagal mengirim OTP. Silakan coba lagi.",
        timer: 3000,
      });
    });
}

// Function to validate email format (you may want to improve this)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.SendOTP = SendOTP;

document.addEventListener('DOMContentLoaded', () => {
  // Handle Enter key press sendOTP
  const inputField = document.querySelectorAll('#email');
  inputField.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default Enter key behavior (form submission)
        SendOTP();
      }
    });
  });
});