import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";

import { getRentChk, getRentInfo } from "../../Function";
import {
  divWrapMainContent,
  divMainContent,
  contentTheme,
  contentSubTheme,
  contentUserTheme,
} from "./UserInfo.module.css";

function UserInfo({ user }) {
  const [isRent, setIsRent] = useState();
  const [rentDate, setRentDate] = useState();
  const [returnDate, setReturnDate] = useState();

  const doGetIsRent = async () => {
    try {
      var getResult = await getRentChk({ user });
      setIsRent(getResult);
      if (getResult == "true") {
        getResult = await getRentInfo({ user });
        setRentDate(getResult.rentDate.slice(0, 10));
        setReturnDate(getResult.returnDate.slice(0, 10));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    doGetIsRent();
  }, []);

  return (
    <div className={`${divWrapMainContent}`}>
      <div className={`${divMainContent}`}>
        <h1 className={`${contentUserTheme}`}>{user}'s Information</h1>
        {isRent === "true" ? (
          <>
            <span className={`${contentTheme}`}>Rent Date</span>
            <br />
            <br />
            <span className={`${contentSubTheme}`}>{rentDate}</span>
            <br />
            <br />
            <br />
            <span className={`${contentTheme}`}>Return Date</span>
            <br />
            <br />
            <span className={`${contentSubTheme}`}>{returnDate}</span>
          </>
        ) : (
          <h1>현재 대여 중인 우산이 없습니다.</h1>
        )}
      </div>
    </div>
  );
}

export default hot(module)(UserInfo);
