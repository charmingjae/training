import axios from "axios";

const users = [
  { email: "kim@test.com", password: "123", name: "Kim" },
  { email: "lee@test.com", password: "456", name: "Lee" },
  { email: "park@test.com", password: "789", name: "Park" },
];

export function signIn({ userID, userPW }) {
  // 초기 상태 일단 주석
  // Init user
  // console.log("here");
  // var user = axios
  //   .post("/api/login", { userID: userID, userPW: userPW })
  //   .then((response) => {
  //     const result = response.data.result;
  //     const userID = response.data.userID;
  //     console.log(result);
  //     console.log(userID);
  //     if (result === "success") {
  //       console.log("true");
  //       user = userID;
  //       // const user = users.find(
  //       //   (user) => user.email === userID && user.password === userPW
  //       // );
  //       // if (user === undefined) throw new Error();
  //       console.log("[SignIn.js] user : ", user);
  //       return user;
  //     } else {
  //       console.log("false");
  //     }
  //   });
  // return user;
  // number 2
  // function request() {
  //   return new Promise(function (resolve, reject) {
  //     var context = axios.post("/api/login", {
  //       userID: userID,
  //       userPW: userPW,
  //     });
  //     resolve(context);
  //   });
  // }
  // // var user = Promise.resolve()
  // //   .then(request)
  // //   .then((result) => );
  // var user = "";
  // request().then(function (resolvedData) {
  //   console.log(resolvedData);
  //   user = resolvedData;
  //   // console.log("[USER] : ", user);
  // });
  // setTimeout(() => {
  //   console.log("음음", user);
  //   user = user;
  // }, 1000);

  function function1() {
    return new Promise(function (resolve, reject) {
      var context1 = axios
        .post("/api/login", {
          userID: userID,
          userPW: userPW,
        })
        .then((response) => resolve(response.data));
    });
  }

  var user = function1().then((response) => {
    console.log("[this user] : ", response);
    return response.userID;
  });

  user = user.then((response) => {
    console.log("[KKK] : ", response);
    console.log("[KKK TYPE] : ", typeof response);
    return response;
  });
  console.log("[user type] : ", typeof user);
  console.log("[user] : ", user);
  console.log("[user length] : ", Object.keys(user).length);

  return user;
}
