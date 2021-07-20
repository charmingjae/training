import axios from "axios";

export function getFilterOverdueList({ stuNum }) {
  function doGetFilterOverdueList() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/getfilteroverduelist", { stuNum: stuNum })
        .then((response) => resolve(response.data));
    });
  }

  const resVal = doGetFilterOverdueList().then((response) => {
    return response;
  });

  return resVal;
}
