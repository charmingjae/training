import axios from "axios";

export function applyUmb({ user }) {
  function doApply() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/doapply", {
          user: user,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doApply().then((response) => {
    return response["result"];
  });

  return resVal;
}
