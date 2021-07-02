import React from "react";

function RegisterInput({ setID, setPW, setPhone }) {
  return (
    <>
      <input
        onChange={({ target: { value } }) => setID(value)}
        type="text"
        placeholder="ID"
      />
      <br />
      <input
        onChange={({ target: { value } }) => setPW(value)}
        type="password"
        placeholder="PASSWORD"
      />
      <br />
      <input
        onChange={({ target: { value } }) => setPhone(value)}
        type="text"
        placeholder="PHONE"
      />
      <br />
      <br />
    </>
  );
}

export default RegisterInput;
