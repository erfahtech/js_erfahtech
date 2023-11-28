// mqttconnection.js
import mqttClient from "./mqttConnection.js";
import { logSubcribe } from "./logSubcribe.js";

let i = 1;
let isFunctionActive = true;

function updateTemperature(temperature) {
  const temperatureElement = document.getElementById("temperature-sensor");
  if (temperatureElement) {
    temperatureElement.textContent = temperature ? ` ${temperature}°C` : "--°C";
  }
}

function updateHumidity(humidity) {
  const humidityElement = document.getElementById("humidity-sensor");
  if (humidityElement) {
    humidityElement.textContent = humidity ? ` ${humidity}%` : "--%";
  }
}

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
        updateTemperature(temperature);
        console.log("Suhu:", temperature);
        updateHumidity(Math.abs(humidity));
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

function initializeMqttConnection() {
  mqttClient.on("connect", () => {
    const email = localStorage.getItem("userEmail");
    console.log("Subcribing...");
    mqttClient.subscribe("urse/" + email + "/monitoring");
    console.log("Berlangganan ke topik urse/" + email + "/monitoring");
  });

  mqttClient.on("message", handleMqttMessage);

  mqttClient.on("error", (error) => {
    console.error("Kesalahan koneksi MQTT:", error);
    updateTemperature(null);
    updateHumidity(null);
  });
}

// Initialize MQTT connection when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeMqttConnection);
