import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export function updateWithBearer(target_url, token, datajson, responseFunction) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(datajson);

  var requestOptions = {
    method: "PUT", // Metode PUT
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(target_url, requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => responseFunction(result)) // Pass the parsed JSON result to the callback
    .catch((error) => console.log("error", error));
}

const editDevice = async (IDEDIT, NAME, TOPIC) => {
  const deviceId = IDEDIT;
  const deviceName = NAME;
  const deviceTopic = TOPIC;
  console.log("Edit device called:", IDEDIT, NAME, TOPIC);

  const { value: combinedInput, isConfirmed: isInputConfirmed } = await Swal.fire({
    title: "Edit Device",
    html: `<div>
                <input id="swal-input1" class="swal2-input" placeholder="New Name" value="${deviceName}">
                <input id="swal-input2" class="swal2-input" placeholder="New Topic" value="${deviceTopic}">
                </div>`,
    showCancelButton: true,
    confirmButtonColor: "#6750A4",
    cancelButtonColor: "#999999",
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    preConfirm: () => {
      const input1 = document.getElementById("swal-input1").value;
      const input2 = document.getElementById("swal-input2").value;

      if (!input1 || !input2) {
        Swal.showValidationMessage("Nama perangkat dan Topic perangkat tidak boleh kosong!");
        return false;
      }

      // Tambahkan validasi huruf kecil untuk input topic
      if (input2 && !/^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(input2)) {
        Swal.showValidationMessage("Topic harus menggunakan huruf kecil!");
        return false;
      }

      return [input1, input2];
    },

    didOpen: () => {
      const inputs = Swal.getPopup().querySelectorAll("input");
      inputs[0].focus();
    },
  });

  if (isInputConfirmed) {
    const [newName, newTopic] = combinedInput;
    const isConfirmed = await Swal.fire({
      title: `Konfirmasi`,
      html: `<div>Apakah Anda yakin mengubah?</div>
                    <div>Nama: ${newName}</div>
                    <div>Topic: ${newTopic}</div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6750A4",
      cancelButtonColor: "#999999",
      confirmButtonText: "Ya, Edit!",
      cancelButtonText: "Batal",
    });

    if (isConfirmed.isConfirmed) {
      const token = getCookie("token");
      const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatedevice?id=${deviceId}`;
      const requestBody = {
        name: newName,
        topic: newTopic,
      };

      try {
        const response = await updateWithBearer(target_url, token, requestBody, (result) => result);
        console.log(response);

        if (response.status === true) {
          await Swal.fire({
            icon: "success",
            title: response.message || "Perangkat berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
          });
          location.reload();
        } else {
          console.error("Request failed with status:", response.status);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Edit Device Gagal",
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
};

window.editDevice = editDevice;
