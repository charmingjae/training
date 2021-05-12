import React from "react";
import { hot } from "react-hot-loader";

const Act1 = ({ params }) => {
  return <div>Act{params} Component</div>;
};

export default hot(module)(Act1);
