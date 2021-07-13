import axios from "axios";

export function getUmbCnt() {
  function getCnt() {
    return new Promise(function (resolve, reject) {
      axios.get("/api/getumbcnt").then((response) => resolve(response.data));
    });
  }

  const resVal = getCnt().then((response) => {
    return response["umbCnt"];
  });

  return resVal;
}
