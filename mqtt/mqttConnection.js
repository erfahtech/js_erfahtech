const email = localStorage.getItem("userEmail");

// Define MQTT broker URL and client ID
const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
const clientId = `user-${email}`;
console.log(clientId);

// Create MQTT client
const mqttClient = mqtt.connect(brokerUrl, {
  clientId: clientId,
  // username: clientId, // Uncomment if your broker requires authentication
  // password: password, // Uncomment and provide the password if required
});

// Set up event handler for successful connection
mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
});

// Set up event handler for connection errors
mqttClient.on("error", (error) => {
  console.error("MQTT connection error:", error);
});

// Export the MQTT client directly
export default mqttClient;
