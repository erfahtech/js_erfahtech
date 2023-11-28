import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const logPublish = (name, topic, payload) => {
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-inserthistory";
  // Mengubah nilai payload sesuai dengan kondisi
  const payloadValue = payload === 1 ? "Menyala" : "Mati";
  const datainjson = {
    name: name,
    topic: topic,
    payload: payloadValue,
  };

  postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
    responseData(result);
  });
};

const responseData = (result) => {
  if (result) {
    console.log(result.message);
  } else {
    console.error(result.message);
  }
};

export { logPublish };
