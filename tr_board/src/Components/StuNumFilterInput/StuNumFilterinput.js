import React from "react";
import {
  inputStuNumFilter,
  divContentWrapper,
  btnDoFilter,
} from "./StuNumFilterinput.module.css";

function StuNumFilterInput({ doSetStuNum, stuNum, doFilterApplyList }) {
  return (
    <div className={`${divContentWrapper}`}>
      <input
        className={`${inputStuNumFilter}`}
        onChange={({ target: { value } }) => doSetStuNum(value)}
        value={stuNum || ""}
      ></input>
      <button className={`${btnDoFilter}`} onClick={doFilterApplyList}>
        Search
      </button>
    </div>
  );
}

export default StuNumFilterInput;
