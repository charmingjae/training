import axios from "axios";

export function setUmbCount({ cntUmbrella }) {
  function doSetUmb() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/doSetUmb", {
          cntUmbrella: cntUmbrella,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doSetUmb().then((response) => {
    return response;
  });

  return resVal;
}
