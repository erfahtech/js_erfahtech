import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const postDevices = () => {
  const nama = document.getElementById("isiName").value;
  let topic = document.getElementById("isiTopic").value;
  const loadingElement = document.getElementById("loading");
  const diabuttonElement = document.getElementById("diabutton");
  const email = localStorage.getItem("userEmail");

  diabuttonElement.style.display = "none";
  loadingElement.style.display = "block";

  if (nama === "" || topic === "") {
    Swal.fire({
      icon: "error",
      title: "Gagal Menambahkan Device",
      text: "Please fill in all fields.",
    });

    loadingElement.style.display = "none";
    diabuttonElement.style.display = "flex";
    return;
  }

  // Validate topic using regex
  const topicRegex = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/`-]+$/; // Allow letters lower case, numbers, and symbols
  if (!topicRegex.test(topic)) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menambahkan Device",
      text: "Topik hanya boleh berisi huruf kecil, angka, dan simbol.",
    });

    loadingElement.style.display = "none";
    diabuttonElement.style.display = "flex";
    return;
  }

  // If validation passes, proceed with the API call
  topic = "urse/" + email + "/" + topic;
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
  const datainjson = {
    name: nama,
    topic: topic,
  };

  postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
    responseData(result);
    loadingElement.style.display = "none";
    diabuttonElement.style.display = "flex";
  });
};

const responseData = (result) => {
  if (result) {
    Swal.fire({
      icon: "success",
      title: "Tambah Device Berhasil",
      text: result.message,
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        window.location.href = "device_control.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Tambah Device Gagal",
      text: result.message,
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }

  // Handle Enter key press PostDevices
  const inputField = document.querySelectorAll('#isiName, #isiTopic');
  inputField.forEach((input) => {
      input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // Prevent the default Enter key behavior (form submission)
              postDevices();
          }
      });
  });
});

window.postDevices = postDevices;
