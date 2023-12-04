// import mqqtt connection
import mqttClient from "../mqtt/mqttConnection.js";
import { logPublish } from "../mqtt/logPublish.js";
import { logSubcribe } from "../mqtt/logSubcribe.js";
import { updateStatusDevice } from "../edit/updateStatusDevice.js";

// mqttSubscribe.js
let i = 1;
let isFunctionActive = true;

function runFunction(topic, suhu, humidity) {
  if (isFunctionActive) {
    logSubcribe(topic, suhu, Math.abs(humidity));
    isFunctionActive = false;
    setTimeout(() => {
      isFunctionActive = true;
      console.log("Fungsi dapat dijalankan kembali setelah 4 menit.");
    }, 4 * 60 * 1000); // Waktu dalam milidetik (4 menit)
  } else {
    console.log("Fungsi sedang dinonaktifkan.");
  }
}

function handleMqttMessage(topic, message) {
  const email = localStorage.getItem("userEmail");
  const receivedMessage = message.toString();
  console.log(`Received message on topic ${topic}: ${receivedMessage} ke ${i++}`);

  if (topic === "urse/" + email + "/monitoring") {
    let data = receivedMessage.match(/(-?\d+(\.\d+)?)/g);
    if (data && data.length === 2) {
      let temperature = parseFloat(data[0]);
      let humidity = parseFloat(data[1]);

      if (!isNaN(temperature) && !isNaN(humidity)) {
        console.log("Suhu:", temperature);
        console.log("Humidity:", Math.abs(humidity));
        runFunction(topic, temperature, humidity);
      } else {
        console.log("Invalid temperature or humidity value received:", receivedMessage);
      }
    } else {
      console.log("Invalid message format:", receivedMessage);
    }
  }
}

export function initializeMqttConnection() {
  mqttClient.on("connect", () => {
    const email = localStorage.getItem("userEmail");
    console.log("Subcribing...");
    mqttClient.subscribe("urse/" + email + "/monitoring");
    console.log("Berlangganan ke topik urse/" + email + "/monitoring");
  });

  mqttClient.on("message", handleMqttMessage);

  mqttClient.on("error", (error) => {
    console.error("Kesalahan koneksi MQTT:", error);
  });
}

// mqttPublish.js
// getdevice.js
export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";

// Ini adalah elemen container di mana Anda akan menambahkan elemen toggle switch
const devicesContainer = document.getElementById("devices");

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiCard);
}

export function isiCard(value) {
  const idDevice = value.id;
  const topic = value.topic;
  const name = value.name;
  const status = value.status;
  // Hapus dua bagian pertama dari topik
  const displayTopic = topic.split("/").slice(2).join("/");

  // Buat elemen toggle switch
  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch relative inline-flex w-[52px] h-1 mb-6";

  const input = document.createElement("input");
  input.className = "toggle-checkbox";
  input.type = "checkbox";
  input.checked = status;
  input.style.display = "none"; // Sembunyikan checkbox

  toggleSwitch.appendChild(input);

  const label = document.createElement("label");
  label.className = "toggle-icon relative block w-12 h-8 rounded-full transition-color duration-150 ease-out";
  label.setAttribute("for", `toggle-${topic}`);

  toggleSwitch.appendChild(label);

  // Tambahkan elemen toggle switch ke container
  const cardDiv = document.createElement("div");
  cardDiv.className = "flex-shrink max-w-full px-4 w-full sm:w-1/2 mb-6";
  cardDiv.innerHTML = `
  <div class="bg-white dark:bg-surfacedark-200 rounded-lg shadow-lg h-full p-6">
    <div class="flex flex-wrap flex-row items-center">
        <div class="flex-shrink max-w-full">
            <h5 class="text-gray-500 mb-1">${displayTopic}</h5>
            <h3 class="text-lg font-bold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-cpu" viewBox="0 0 16 16">
                    <path
                        d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
                ${name}
            </h3>
            <p class="status text-sm text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-broadcast"
                    viewBox="0 0 16 16">
                    <path
                        d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
                <span id="status-${idDevice}" style="color: ${status ? "green" : "red"};">${status ? "ON" : "OFF"}</span>
            </p>
            <br/>
        </div>
    </div>
  </div>
  `;

  cardDiv.querySelector(".flex-shrink").appendChild(toggleSwitch);
  devicesContainer.appendChild(cardDiv);

  toggleSwitch.addEventListener("click", (event) => {
    const input = event.currentTarget.querySelector("input");
    const cardId = idDevice; // ID elemen status yang sesuai dengan card
    console.log("Toggle switch clicked:", cardId);
    const statusSpan = document.getElementById(`status-${idDevice}`); // Dapatkan elemen status yang sesuai
    console.log("Status span:", statusSpan);

    input.checked = !input.checked;
    const payload = input.checked ? "1" : "0";

    if (mqttClient.connected) {
      // Kirim payload ke topik - mqtt.publish
      mqttClient.publish(topic, payload);
      console.log(`Mengirim payload ${payload} ke topik ${topic}`);

      // Ubah teks status
      if (statusSpan) {
        // Check if statusSpan is not null
        statusSpan.textContent = input.checked ? "ON" : "OFF";
        statusSpan.style.color = input.checked ? "green" : "red";
      } else {
        console.error(`Elemen status dengan ID 'status-${cardId}' tidak ditemukan.`);
      }

      // Ubah status di database
      if (input.checked) {
        updateStatusDevice(cardId, true); // Panggil dengan nilai true jika toggle aktif
      } else {
        updateStatusDevice(cardId, false); // Panggil dengan nilai false jika toggle nonaktif
      }

      // simpan log
      logPublish(name, topic, parseInt(payload));
    } else {
      console.error("Koneksi MQTT tidak aktif");
    }
  });
}
