import React from "react";

import {
  divWrapMainContent,
  divMainContent,
  contentTheme,
  contentSubTheme,
  contentRemainTheme,
  contentCountUmb,
  buttonGetUmbrella,
} from "./Main.module.css";

function Main() {
  return (
    <div className={`${divWrapMainContent}`}>
      <div className={`${divMainContent}`}>
        <h1 className={`${contentTheme}`}>Basket</h1>
        <h2 className={`${contentSubTheme}`}>Umbrella Rental System</h2>
        <h1 className={`${contentRemainTheme}`}>Remain Umbrella</h1>
        <h2 className={`${contentCountUmb}`}>30</h2>
        <button className={`${buttonGetUmbrella}`}>RENT</button>
      </div>
    </div>
  );
}

export default Main;
