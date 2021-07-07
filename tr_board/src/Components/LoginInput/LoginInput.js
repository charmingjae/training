import React from "react";

function LoginInput({ setID, setPW }) {
  return (
    <>
      <input onChange={({ target: { value } }) => setID(value)} type="text" />
      <br />
      <input
        onChange={({ target: { value } }) => setPW(value)}
        type="password"
      />
      <br />
      <br />
    </>
  );
}

export default LoginInput;
