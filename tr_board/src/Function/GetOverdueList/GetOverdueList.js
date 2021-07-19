import axios from "axios";

export function getOverdueList() {
  function doGetOverdueList() {
    return new Promise(function (resolve, reject) {
      axios
        .get("/api/getoverduelist")
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doGetOverdueList().then((response) => {
    return response;
  });

  return resVal;
}
