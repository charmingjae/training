import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import {
  divWrapMainContent,
  divMainContent,
  contentTheme,
  contentSubTheme,
  contentRemainTheme,
  contentCountUmb,
  buttonGetUmbrella,
} from "./Main.module.css";
import { getUmbCnt, getRentChk, applyUmb } from "../../Function";

function Main({ authenticated, user }) {
  const [umbCnt, setUmbCnt] = useState();

  const doGetUmbCnt = async () => {
    try {
      var getResult = await getUmbCnt();
      setUmbCnt(getResult);
    } catch (e) {
      console.log(e);
    }
  };

  const doRentUmb = async () => {
    if (!authenticated) {
      alert("로그인이 필요합니다.");
      return;
    } else if (umbCnt == 0) {
      alert("현재 대여할 수 있는 우산이 없습니다.");
      return;
    }
    try {
      var getIsRent = await getRentChk({ user });
      if (getIsRent == "true") {
        alert("현재 대여 중인 우산이 있습니다.");
        return;
      } else {
        var getResult = await applyUmb({ user });
        if (getResult == "success") {
          alert("신청이 완료되었습니다.");
          doGetUmbCnt();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    doGetUmbCnt();
  }, []);

  return (
    <div className={`${divWrapMainContent}`}>
      <div className={`${divMainContent}`}>
        <h1 className={`${contentTheme}`}>Basket</h1>
        <h2 className={`${contentSubTheme}`}>Umbrella Rental System</h2>
        <h1 className={`${contentRemainTheme}`}>Remain Umbrella</h1>
        <h2 className={`${contentCountUmb}`}>{umbCnt}</h2>
        <button className={`${buttonGetUmbrella}`} onClick={doRentUmb}>
          RENT
        </button>
      </div>
    </div>
  );
}

export default hot(module)(Main);
