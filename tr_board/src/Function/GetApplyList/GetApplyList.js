import axios from "axios";

export function getApplyList() {
  function doGetApplyList() {
    return new Promise(function (resolve, reject) {
      console.log("PROMISE START");
      axios.get("/api/getapplylist").then((response) => resolve(response.data));
    });
  }

  const resVal = doGetApplyList().then((response) => {
    return response;
  });

  return resVal;
}
