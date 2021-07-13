import axios from "axios";

export function getRentChk({ user }) {
  function doCheck() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/doCheckIsRent", {
          user: user,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doCheck().then((response) => {
    return response["isRent"];
  });

  return resVal;
}
