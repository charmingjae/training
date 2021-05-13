import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [username, setName] = useState("");

  axios.get("/api/dd").then((response) => {
    console.log(response);
  });

  // const test = async () => {
  //   const response = await axios.get("/dd");
  //   console.log(response);
  // };

  return (
    <>
      <h1>Test</h1>
      {username ? `Hello ${username}` : "Hello World"}
    </>
  );
}

export default Test;
