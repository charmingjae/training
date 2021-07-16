import axios from "axios";

export function getRentList() {
  function doGetRentList() {
    return new Promise(function (resolve, reject) {
      console.log("PROMISE START");
      axios.get("/api/getrentlist").then((response) => resolve(response.data));
    });
  }

  const resVal = doGetRentList().then((response) => {
    return response;
  });

  return resVal;
}
