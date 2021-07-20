import React from "react";

function StuNumFilterInput({ doSetStuNum, stuNum, doFilterApplyList }) {
  return (
    <>
      <input
        onChange={({ target: { value } }) => doSetStuNum(value)}
        value={stuNum || ""}
      ></input>
      <button onClick={doFilterApplyList}>검색</button>
    </>
  );
}

export default StuNumFilterInput;
