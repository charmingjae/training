import axios from "axios";

export function returnApply({ selData }) {
  function doReturnApply() {
    return new Promise(function (resolve, reject) {
      console.log("USERLIST : ", selData);
      axios
        .post("/api/returnapply", {
          selData: selData,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doReturnApply().then((response) => {
    return response;
  });

  return resVal;
}
