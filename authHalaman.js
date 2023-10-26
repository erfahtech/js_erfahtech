import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const authHalaman = () => {
  // Mendapatkan nilai cookie dengan nama "token" menggunakan fungsi getCookie
  const token = getCookie("token");

  // Mendapatkan URL sebelumnya dari local storage (jika ada)
  // const previousPageURL = localStorage.getItem("previousPageURL");

  // Mengambil path saat ini
  const currentPath = window.location.pathname;

  if (!token && !currentPath.includes("/pages/auth/login.html")) {
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: "Anda belum login!",
      confirmButtonText: "OK",
    }).then(() => {
      if (currentPath.includes("/pages/user/")) {
        window.location.href = "../auth/login.html";
      } else {
        window.location.href = "pages/auth/login.html";
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", authHalaman);
