import axios from "axios";

export function getApplyChk({ user }) {
  function doCheck() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/doCheckIsApply", {
          user: user,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doCheck().then((response) => {
    return response["isApply"];
  });

  return resVal;
}
