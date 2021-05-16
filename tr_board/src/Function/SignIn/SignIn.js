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
    return response.userID;
  });

  return user;
}
