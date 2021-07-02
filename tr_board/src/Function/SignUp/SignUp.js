import axios from "axios";

// * test data
// const users = [
//   { email: "kim@test.com", password: "123", name: "Kim" },
//   { email: "lee@test.com", password: "456", name: "Lee" },
//   { email: "park@test.com", password: "789", name: "Park" },
// ];

export function signUp({ userID, userPW, userPhone }) {
  // console.log("[SignUp] : ", userID);
  // console.log("[SignUp] : ", userPW);
  // router : register api
  console.log("FLAGFLAGFLAGFLAGFLAGFLAG111111111");
  // axios
  //   .post("/api/register", {
  //     userID: userID,
  //     userPW: userPW,
  //     userPhone: userPhone,
  //   })
  //   .then((response) => {
  //     console.log("signup response : ", response);
  //   });

  // console.log("FLAGFLAGFLAGFLAGFLAGFLAG2222222222");

  // dummy check
  // const user = users.find(
  //   (user) => user.email === userID && user.password === userPW
  // );
  // if (user === undefined) throw new Error();

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
