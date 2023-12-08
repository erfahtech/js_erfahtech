// resetpassword.js

function ResetPassword() {
    // Get the email dan OTP
    const emailInput = localStorage.getItem("sentEmail");
    const otpInput = localStorage.getItem("sentOTP");
  
    // Get the OTP input value
    const newpasswordInput = document.getElementById("password").value;
  
    // Validate the email (you may want to add more validation)
    if (!isValidPassword(newpasswordInput)) {
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
      password: newpasswordInput,
    };
  
    // Make a POST request to your API endpoint
    fetch("https://asia-southeast2-urse-project.cloudfunctions.net/urse-resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Check if the request was successful (you may want to add more checks)
        if (response.ok) {
          // Remove the data in localStorage
          localStorage.removeItem("sentEmail");
          localStorage.removeItem("sentOTP");
          localStorage.removeItem("sentPassword");
          // Display a success message
          Swal.fire({
            icon: "success",
            title: "Reset Password Berhasil",
            text: "Password Anda berhasil diubah. Silakan login dengan password baru Anda",
            Timer: 5000,
          }).then(() => {
            // Redirect the user to the OTP verification page
            window.location.href = "login.html";
          });
        } else {
          // Display an error message
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gagal Reset Password. Silakan coba lagi.",
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        // Display an error message if there is a network issue
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Gagal Reset Password. Silakan coba lagi.",
          timer: 3000,
        });
      });
  }
  
  // Function to validate otp format
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  window.ResetPassword = ResetPassword;

  document.addEventListener('DOMContentLoaded', () => {
    // Handle Enter key press ResetPassword
    const inputField = document.querySelectorAll('#password');
    inputField.forEach((input) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default Enter key behavior (form submission)
                ResetPassword();
            }
        });
    });
});
  