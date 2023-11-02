import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const postDevices = async () => {
  const nama = document.getElementById("isiName").value;
  const topic = document.getElementById("isiTopic").value;
  const loadingElement = document.getElementById("loading");
  const diabuttonElement = document.getElementById("diabutton");

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

  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
  const datainjson = {
    name: nama,
    topic: topic,
  };

  try {
    const result = await postWithBearer(target_url, getCookie("token"), datainjson);
    responseData(result);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Tambah Device Gagal",
      text: error.message,
    });
  } finally {
    loadingElement.style.display = "none";
    diabuttonElement.style.display = "flex";
  }
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

window.postDevices = postDevices;
