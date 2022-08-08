import axios from "axios";

const customHeader = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

const baseAxios = (method, url, data = {}) => {
  let arg = {
    method: method,
    url: `${url}`,
    headers: customHeader(),
    data: JSON.stringify(data),
  };
  switch (method) {
    case "get":
      arg.params = data;
      break;
    case "post":
      arg.data = JSON.stringify(data);
      break;
    case "put":
      arg.data = data;
      break;
    case "delete":
      arg.data = data;
      break;
    default:
      arg.data = JSON.stringify(data);
    // code block
  }

  return axios(arg)
    .then((res) => res)
    .catch((error) => ({ error: error }));
};

const useAxios = {};
["get", "post", "put", "delete"].forEach((method) => {
  useAxios[method] = baseAxios.bind(null, method);
});
export default useAxios;
