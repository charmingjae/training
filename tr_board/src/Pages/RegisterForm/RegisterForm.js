import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import { RegisterInput } from "../../Components";

function RegisterForm({ authenticated, register, location }) {
  //
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const { from } = location.state || { from: { pathname: "/" } };
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

  const onButtonClick = async () => {
    try {
      // * 회원가입 폼 인풋 빈 값 체크
      // - userID, userPW, userPhone 값은 <RegisterInput>에 값을 입력할 때 변경 됨
      if (userID == "" || userPW == "" || userPhone == "") {
        alert("Check your data");
      } else {
        // * 빈 값이 없을 때
        // - getRegisterResult : 회원가입 버튼 눌렀을 때 성공 여부 가져오기
        // - 성공 시 userID 가져옴
        // - await를 사용한 이유는 SignUp.js에서 user를 리턴해줄 때 Promise를 사용하기 때문이다.
        // - register(params)는 Root.js의 doRegister() 메서드를 가져온 것
        // * doRegister : Root.js의 리턴 값을 받아오는 변수
        // - return value : undefined 또는 true ( Root.js 46, 49 )
        // * 순서
        // Root.js의 doRegister() 거치고 RegisterForm의 register() 수행
        // 클릭 -> register() -> doRegister() -> signUp() -> doRegister() -> register()
        var getRegisterResult = await register({ userID, userPW, userPhone });
        if (getRegisterResult === undefined) throw new Error();
      }
    } catch (e) {
      alert("Failed to Register");
      setUserID("");
      setUserPW("");
      setUserPhone("");
    }
  };

  // If authenticated is true, Redirect to '/'
  if (authenticated) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h1>Register</h1>
      <RegisterInput setID={setID} setPW={setPW} setPhone={setPhone} />
      <button onClick={onButtonClick}>Register</button>
    </div>
  );
}

export default hot(module)(RegisterForm);
