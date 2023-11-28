import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const logSubcribe = (topic, suhu, humidity) => {
  const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-inserthistory";
  const datainjson = {
    name: "monitoring",
    topic: topic,
    payload: "suhu: " + suhu + "," + "humidity: " + humidity,
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

export { logSubcribe };
