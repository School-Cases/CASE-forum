export const api_address = "http://localhost:8080";
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
  // }).then((res) => console.log(res));
};

export const post = async (endpoint, data) => {
  console.log(data);
  return await fetch(api_address + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
