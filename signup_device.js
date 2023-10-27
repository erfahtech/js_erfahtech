import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const postSignUp = () => {
    const nama = getValue("isiName");
    const topic = getValue("isiTopic");
    const loadingElement = document.getElementById("loading");

    loadingElement.style.display = "block";

    if (!nama || !topic) {
        Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Device",
            text: "Please fill in all fields."
        });

        loadingElement.style.display = "none";
        return;
    }

    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertDevice";
    const datainjson = {
        name: nama,
        topic: topic
    };

    postWithBearer(target_url, getCookie("token"), datainjson, responseData, () => {
        loadingElement.style.display = "none";
    });
};

const responseData = (result) => {
    if (result) {
        Swal.fire({
            icon: "success",
            title: "Tambah Device Berhasil",
            text: "You have successfully added a device."
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                window.location.href = "dashboard.html";
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Tambah Device Gagal",
            text: result.message
        });
    }
};

console.log(getCookie("token"));

window.postSignUp = postSignUp;
