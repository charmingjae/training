import React from "react";
import { hot } from "react-hot-loader";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { btnAdmin, btnContentWrapper } from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <div className={`${btnContentWrapper}`}>
      <Link to="/setting/umbrellacount">
        <button className={`${btnAdmin}`}>Set Count</button>
      </Link>
      <Link to="/applylist">
        <button className={`${btnAdmin}`}>Apply List</button>
      </Link>
      <Link to="/rentallist">
        <button className={`${btnAdmin}`}>Rental List</button>
      </Link>
      <Link to="/overduelist">
        <button className={`${btnAdmin}`}>Overdue List</button>
      </Link>
    </div>
  );
}

export default hot(module)(AdminHeader);
