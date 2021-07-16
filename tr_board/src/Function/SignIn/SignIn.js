import axios from "axios";

export function signIn({ userID, userPW }) {
  function function1() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/login", {
          userID: userID,
          userPW: userPW,
        })
        .then((response) => resolve(response.data));
    });
  }

  var user = function1().then((response) => {
    console.log("[this user] : ", response);
    return response;
  });

  return user;
}
