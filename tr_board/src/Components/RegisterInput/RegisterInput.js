import React from "react";

function RegisterInput({ setID, setPW, setPhone }) {
  return (
    <>
      <input onChange={({ target: { value } }) => setID(value)} type="text" />
      <br />
      <input onChange={({ target: { value } }) => setPW(value)} type="text" />
      <br />
      <input
        onChange={({ target: { value } }) => setPhone(value)}
        type="text"
      />
      <br />
      <br />
    </>
  );
}

export default RegisterInput;
