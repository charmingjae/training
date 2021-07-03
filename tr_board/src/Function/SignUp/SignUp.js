import axios from "axios";

export function signUp({ userID, userPW, userPhone }) {
  // /api/register에 데이터 보내고 응답 받아오는 함수
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
  // chkSignUp에 response 받아오면 response안에 있는 userID 리턴하기
  var user = chkSignUp().then((response) => {
    return response.userID;
  });
  // 만약 user가 undefined면 에러 던지기
  if (user === undefined) throw new Error();
  // 정상적으로 받아오면 user 리턴
  return user;
}
