import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import { divContentWrapper, btnDoLogin } from "./LoginForm.module.css";

// import input component
import { LoginInput } from "../../Components";

function LoginForm({ authenticated, login, location }) {
  // init const
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const onButtonClick = async () => {
    try {
      // try login using was passed doLogin function
      var getLoginResult = await login({ userID, userPW });
      if (getLoginResult === undefined) throw new Error();
    } catch (e) {
      alert("로그인 정보를 확인하세요.");
      // setUserID("");
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
      <div className={`${divContentWrapper}`}>
        <h1>Welcome!</h1>
        <LoginInput setID={setID} setPW={setPW} />
        <button className={`${btnDoLogin}`} onClick={onButtonClick}>
          Login
        </button>
      </div>
    </>
  );
}

export default hot(module)(LoginForm);
