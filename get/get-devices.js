import { URLGetDevice, responseData, initializeMqttConnection } from "../user/controlDevice.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const get = (target_url, responseFunction) => {
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

get(URLGetDevice, responseData);

// Mengambil pesan login dari Local Storage
var pesanLogin = localStorage.getItem("pesanlogin");

// Memeriksa apakah pesan login ada
if (pesanLogin) {
  // Menghapus "selamat datang" dan "di USE"
  var namaPengguna = pesanLogin.replace("Selamat Datang", "").replace("di USE", "");

  // Memotong teks untuk menampilkan hanya nama pengguna
  var namaPenggunaTrimmed = namaPengguna.trim();

  // Menambahkan informasi perangkat
  var pesanFinal = "Device Milik " + namaPenggunaTrimmed;

  // Menampilkan pesan akhir
  console.log(pesanFinal);
  const userGreetingElement = document.getElementById("userGreeting");
  userGreetingElement.innerText = pesanFinal;
} else {
  console.log("Tidak ada pesan login dalam Local Storage");
}

initializeMqttConnection();
