import axios from "axios";

export function rentUmb() {
  function doRent() {
    return new Promise(function (resolve, reject) {
      axios.post("/api/dorent").then((response) => resolve(response.data));
    });
  }

  const resVal = doRent().then((response) => {
    return response["result"];
  });

  return resVal;
}
