export const api_address = "http://localhost";
// export const api_address = "http://glimra.glimnet.se";
export const client_address = "http://localhost:3000";

export const get = async (endpoint, signal) => {
  return await fetch(api_address + endpoint, {
    method: "GET",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // authorization: localStorage.getItem("token") || "",
    },
  }).then((res) => res.json());
};

export const POST = async (endpoint, data) => {
  return await fetch(api_address + endpoint, {
    method: "POST",
    headers: {
      // "Content-Type": "*",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      // authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify(data),
    // body: data,
  }).then((res) => res.json());
};

export const POSTFORMDATA = async (endpoint, data) => {
  return await fetch(api_address + endpoint, {
    method: "POST",
    // headers: {
    //   // "Content-Type": "*",
    //   // "Content-Type": "multipart/form-data",
    //   // "Access-Control-Allow-Origin": "*",
    //   // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    //   // authorization: localStorage.getItem("token") || "",
    // },
    // body: JSON.stringify(data),
    body: data,
  }).then((res) => res.json());
};
