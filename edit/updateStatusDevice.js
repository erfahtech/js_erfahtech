// apiService.js
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const updatetWithBearer = async (target_url, token, datajson, responseFunction) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(datajson);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(target_url, requestOptions);
    const result = await response.text();
    responseFunction(JSON.parse(result));
    return response; // Return the entire response object
  } catch (error) {
    console.log("error", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

const updateStatusDevice = async (DEVICEID, STATUS) => {
  const token = getCookie("token");
  const target_url = `https://asia-southeast2-urse-project.cloudfunctions.net/urse-updatestatusdevice?id=${DEVICEID}`;

  const datajson = {
    status: STATUS,
  };

  const response = await updatetWithBearer(target_url, token, datajson, (result) => {
    responseData(result);
  });
  return response;
};

const responseData = (result) => {
  if (result) {
    console.log(result.message);
  } else {
    console.error(result.message);
  }
};

export { updatetWithBearer, updateStatusDevice };
