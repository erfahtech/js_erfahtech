import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const authLogin = () => {
  // Mendapatkan nilai cookie dengan nama "token" menggunakan fungsi getCookie
  const token = getCookie("token");

  // Mendapatkan URL sebelumnya dari local storage (jika ada)
  const previousPageURL = localStorage.getItem("previousPageURL");

  if (token && previousPageURL) {
    Swal.fire({
      icon: "info",
      title: "Informasi",
      text: "Anda sudah login. Kembali ke halaman sebelumnya.",
      confirmButtonText: "OK",
    }).then(() => {
      // Redirect ke halaman sebelumnya
      window.location.href = previousPageURL;

      // Menonaktifkan tombol dengan ID "buttonlogin" jika diperlukan
      const loginButton = document.getElementById("buttonlogin");
      if (loginButton) {
        loginButton.style.display = "none";
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", authLogin);
