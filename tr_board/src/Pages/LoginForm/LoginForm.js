import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// import input component
import { LoginInput } from "../../Components";

function LoginForm({ authenticated, doLogin, location }) {
  // init const
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const onButtonClick = () => {
    try {
      // try login using was passed doLogin function
      doLogin({ userID, userPW });
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
      <button>Login</button>
    </>
  );
}

export default LoginForm;
