import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const clearHistory = async () => {

  const isConfirmed = await Swal.fire({
    title: "Apakah Anda yakin ingin menghapus History?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6750A4",
    cancelButtonColor: "#999999",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (isConfirmed.isConfirmed) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie("token"));

    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net//urse-deletehistory";

    try {
      const response = await fetch(target_url, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Data History berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
        location.reload();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

window.clearHistory = clearHistory;
