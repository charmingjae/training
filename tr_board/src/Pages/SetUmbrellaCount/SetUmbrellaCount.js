import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { divWrapContents } from "./SetUmbrellaCount.module.css";
import { setUmbCount } from "../../Function";

function SetUmbrellaCount() {
  const [cntUmbrella, setCntUmbrella] = useState();
  const setCount = (value) => {
    setCntUmbrella(value);
  };
  const onButtonClick = async () => {
    try {
      const getSetResult = await setUmbCount({ cntUmbrella });
      if (getSetResult.result === "success") {
        setCntUmbrella();
        alert("수정 완료");
      } else {
        alert("오류 발생");
      }
    } catch (e) {
      alert("오류 발생.");
    }
  };

  return (
    <div className={`${divWrapContents}`}>
      <input
        onChange={({ target: { value } }) => setCount(value)}
        type="text"
        value={cntUmbrella || ""}
      />
      <button onClick={onButtonClick}>Set</button>
    </div>
  );
}

export default hot(module)(SetUmbrellaCount);
