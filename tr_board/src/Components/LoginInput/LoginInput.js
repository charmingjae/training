import React from "react";
import { inputStyle, divContentWrapper } from "./LoginInput.module.css";

function LoginInput({ setID, setPW }) {
  return (
    <div>
      <input
        className={`${inputStyle}`}
        onChange={({ target: { value } }) => setID(value)}
        type="text"
        placeholder="Student Number"
      />
      <br />
      <input
        className={`${inputStyle}`}
        onChange={({ target: { value } }) => setPW(value)}
        type="password"
        placeholder="Password"
      />
      <br />
      <br />
    </div>
  );
}

export default LoginInput;
