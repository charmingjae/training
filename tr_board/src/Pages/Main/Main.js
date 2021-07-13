import React, { useEffect, useState } from "react";
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
import { getUmbCnt, rentUmb } from "../../Function";

function Main({ authenticated, location }) {
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
    }
    try {
      var getResult = await rentUmb();
      if (getResult == "success") {
        alert("대여가 완료되었습니다.");
        doGetUmbCnt();
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
