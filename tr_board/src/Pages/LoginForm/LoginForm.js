import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";

// import input component
import { LoginInput } from "../../Components";

function LoginForm({ authenticated, login, location }) {
  // init const
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const onButtonClick = async () => {
    try {
      // log now userID, userPW
      console.log("[CHECK] userID : ", userID);
      console.log("[CHECK] userPW : ", userPW);
      // try login using was passed doLogin function
      var getLoginResult = await login({ userID, userPW });
      // console.log("[LoginForm.js] getLoginResult : ", getLoginResult);
      if (getLoginResult === undefined) throw new Error();
    } catch (e) {
      // 원래 login() 부분에서 throw new Error() 발생 시
      // 하단의 부분이 실행 되어야 하는데, throw new Error 하는 방법 찾지 못함
      alert("로그인 정보를 확인하세요.");
      setUserID("");
      setUserPW("");
    }
  };

  const { from } = location.state || { from: { pathname: "/" } };

  // If authenticated is true, Redirect to '/'
  if (authenticated) {
    return <Redirect to={from} />;
  }

  // Pass set userID, userPW function
  // Don't use {value}
  const setID = (value) => {
    setUserID(value);
  };

  const setPW = (value) => {
    setUserPW(value);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginInput setID={setID} setPW={setPW} />
      <button onClick={onButtonClick}>Login</button>
    </>
  );
}

export default hot(module)(LoginForm);
