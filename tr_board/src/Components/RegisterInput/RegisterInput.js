import React from "react";
import { inputStyle, divContentWrapper } from "./RegisterInput.module.css";

function RegisterInput({ setID, setPW, setPhone, setStuNum }) {
  return (
    <div>
      <input
        className={`${inputStyle}`}
        onChange={({ target: { value } }) => setID(value)}
        type="text"
        placeholder="ID"
      />
      <br />
      <input
        className={`${inputStyle}`}
        onChange={({ target: { value } }) => setStuNum(value)}
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
      <input
        className={`${inputStyle}`}
        onChange={({ target: { value } }) => setPhone(value)}
        type="text"
        placeholder="Phone [ ex) 010-1234-5678 ]"
      />
      <br />
      <br />
    </div>
  );
}

export default RegisterInput;
