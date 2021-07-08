import React from "react";

import {
  divWrapMainContent,
  divMainContent,
  contentTheme,
  contentSubTheme,
  contentRemainTheme,
  contentCountUmb,
} from "./Main.module.css";

function Main() {
  return (
    <div className={`${divWrapMainContent}`}>
      <div className={`${divMainContent}`}>
        <h1 className={`${contentTheme}`}>Basket</h1>
        <h2 className={`${contentSubTheme}`}>Umbrella Rental System</h2>
        <h1 className={`${contentRemainTheme}`}>Remain Umbrella</h1>
        <h2 className={`${contentCountUmb}`}>30</h2>
      </div>
    </div>
  );
}

export default Main;
