import axios from "axios";

export function getRentInfo({ user }) {
  function doGetInfo() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/doRentInfo", {
          user: user,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doGetInfo().then((response) => {
    return response;
  });

  return resVal;
}
