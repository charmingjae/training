import axios from "axios";

export function rentUmb({ user }) {
  function doRent() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/dorent", {
          user: user,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doRent().then((response) => {
    return response["result"];
  });

  return resVal;
}