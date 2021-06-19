import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";

// import Register Input components
import { RegisterInput } from "../../Components";

function RegisterForm({ authenticated, register, location }) {
  // init const
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const onButtonClick = () => {
    try {
      // log now userID, userPW
      console.log("[RegisterForm] userID : ", userID);
      console.log("[RegisterForm] userPW : ", userPW);
      // try login using was passed doLogin function
      register({ userID, userPW, userPhone });
    } catch (e) {
      alert("Failed to Register");
      setUserID("");
      setUserPW("");
      setUserPhone("");
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

  const setPhone = (value) => {
    setUserPhone(value);
  };

  return (
    <div>
      <h1>Register</h1>
      <RegisterInput setID={setID} setPW={setPW} setPhone={setPhone} />
      <button onClick={onButtonClick}>Register</button>
    </div>
  );
}

export default hot(module)(RegisterForm);
