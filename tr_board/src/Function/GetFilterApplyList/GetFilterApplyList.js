import axios from "axios";

export function getFilterApplyList({ stuNum }) {
  function doGetFilterApplyList() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/getfilterapplylist", { stuNum: stuNum })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doGetFilterApplyList().then((response) => {
    return response;
  });

  return resVal;
}
