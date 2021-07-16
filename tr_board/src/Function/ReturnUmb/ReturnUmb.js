import axios from "axios";

export function returnUmb({ selData }) {
  function doReturnUmb() {
    return new Promise(function (resolve, reject) {
      console.log("USERLIST : ", selData);
      axios
        .post("/api/returnumb", {
          selData: selData,
        })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doReturnUmb().then((response) => {
    console.log(response);
    return response;
  });

  return resVal;
}
