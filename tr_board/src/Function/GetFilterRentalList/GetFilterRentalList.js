import axios from "axios";

export function getFilterRentalList({ stuNum }) {
  function doGetFilterRentalList() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/getfilterrentallist", { stuNum: stuNum })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doGetFilterRentalList().then((response) => {
    return response;
  });

  return resVal;
}
