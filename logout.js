const logout = () => {
    Swal.fire({
        title: "Apa kah kamu yakin?",
        text: "Sesi kamu akan berakhir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
    }).then((result) => {
        if (result.isConfirmed) {
            // localStorage.removeItem("token");
            // Menghapus url sebelumnya dari local storage
            localStorage.removeItem("previousPageURL");
            // Menghapus toke dari cookie
            document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            window.location.href = "../../index.html";
        }
    });
}

export default logout;