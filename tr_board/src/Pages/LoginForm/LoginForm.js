import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";

// import input component
import { LoginInput } from "../../Components";

function LoginForm({ authenticated, login, location }) {
  // init const
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const onButtonClick = () => {
    try {
      // log now userID, userPW
      console.log("[CHECK] userID : ", userID);
      console.log("[CHECK] userPW : ", userPW);
      // try login using was passed doLogin function
      var test = login({ userID, userPW });
      console.log("test : ", test);
    } catch (e) {
      alert("Failed to Login");
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
