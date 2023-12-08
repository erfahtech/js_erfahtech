// verifyOtp.js

function VerifyOTP() {
  // Get the email input value
  const emailInput = localStorage.getItem("sentEmail");

  // Get the OTP input value
  const otpInput = document.getElementById("otp").value;

  // Validate the email (you may want to add more validation)
  if (!isValidOTP(otpInput)) {
    // Display an error message
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
      text: "Silakan masukkan OTP yang valid. OTP terdiri dari 6 angka.",
    });
    return;
  }

  // Prepare the data to send in the request
  const data = {
    otp: otpInput,
    email: emailInput,
  };

  // Make a POST request to your API endpoint
  fetch("https://asia-southeast2-urse-project.cloudfunctions.net/urse-verifyotp", {
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
        localStorage.setItem("sentOTP", otpInput);

        // Display a success message
        Swal.fire({
          icon: "success",
          title: "Kode OTP Benar",
          text: `Silakan masukkan password baru Anda.`,
          timer: 5000,
        }).then(() => {
          // Redirect the user to the OTP verification page
          window.location.href = "resetpassword.html";
        });
      } else {
        // Display an error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Gagal verifikasi OTP. ${data.message}`,
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      // Display an error message if there is a network issue
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Gagal verifikasi OTP. Silakan coba lagi.",
        timer: 3000,
      });
    });
}

// Function to validate OTP format
function isValidOTP(otp) {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
}

window.VerifyOTP = VerifyOTP;

document.addEventListener('DOMContentLoaded', () => {
  // Handle Enter key press VerifyOTP
  const inputField = document.querySelectorAll('#otp');
  inputField.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default Enter key behavior (form submission)
        VerifyOTP();
      }
    });
  });
});