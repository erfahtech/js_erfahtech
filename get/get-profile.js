// Import URL dan fungsi respons yang sesuai
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

document.addEventListener("DOMContentLoaded", function () {
    const getProfile = (target_url, responseFunction) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getCookie("token"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(target_url, requestOptions)
            .then((response) => response.text())
            .then((result) => responseFunction(JSON.parse(result)))
            .catch((error) => console.log("error", error));
    };

    // Panggil fungsi getProfile dengan URLGetProfile dan responseProfileData
    getProfile(URLGetProfile, responseProfileData);
});

export const URLGetProfile = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getprofile";

export const responseProfileData = (data) => {
    // Pastikan data adalah array dan memiliki elemen pertama
    if (Array.isArray(data) && data.length > 0) {
        const userData = data[0]; // Ambil elemen pertama dari array

        // Menggunakan getElementById untuk mengatur nilai dalam elemen HTML
        document.getElementById("username").textContent = userData.username;
        document.getElementById("email").textContent = userData.email;
        document.getElementById("phonenumber").textContent = userData.phonenumber;

        //Mengambil Lokasi
        const location = localStorage.getItem("userlocation");
        document.getElementById("location").textContent = location;
    } else {
        console.error("Data pengguna tidak valid atau tidak ditemukan.");
    }
};
