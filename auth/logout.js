const logout = () => {
  Swal.fire({
    title: "Apa kah kamu yakin?",
    text: "Sesi kamu akan berakhir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6750A4",
    cancelButtonColor: "#999999",
    confirmButtonText: "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      // localStorage.removeItem("token");
      // Menghapus data dari local storage
      localStorage.removeItem("previousPageURL");
      localStorage.removeItem("totalDevices");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userlocation");
      localStorage.removeItem("pesanlogin");
      // Menghapus toke dari cookie
      document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "../../index.html";
    }
  });
};

window.logout = logout;
