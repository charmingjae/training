import axios from "axios";

// * test data
// const users = [
//   { email: "kim@test.com", password: "123", name: "Kim" },
//   { email: "lee@test.com", password: "456", name: "Lee" },
//   { email: "park@test.com", password: "789", name: "Park" },
// ];

export function signUp({ userID, userPW, userPhone }) {
  function chkSignUp() {
    return new Promise(function (resolve, reject) {
      axios
        .post("/api/register", {
          userID: userID,
          userPW: userPW,
          userPhone: userPhone,
        })
        .then((response) => resolve(response.data));
    });
  }

  var user = chkSignUp().then((response) => {
    return response.userID;
  });

  console.log("USER : ", user);
  if (user === undefined) throw new Error();

  console.log("[SignUp.js] user : ", user);

  return user;
}
