import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
  divWrapPage,
  divWrapHeader,
  divWrapContents,
} from "./Admin.module.css";
import { hot } from "react-hot-loader";
import { AdminHeader } from "../../Components";
import { SetUmbrellaCount, RentalList, ApplyList } from "../../Pages";

function Admin() {
  return (
    <Router>
      <div className={`${divWrapPage}`}>
        <div className={`${divWrapHeader}`}>
          <AdminHeader />
        </div>
        <div className={`${divWrapContents}`}>
          <Switch>
            <Route
              path={["/admin", "/setting/umbrellacount"]}
              render={(props) => <SetUmbrellaCount {...props} />}
            />
            <Route
              path="/applylist"
              render={(props) => <ApplyList {...props} />}
            />
            <Route
              path="/rentallist"
              render={(props) => <RentalList {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default hot(module)(Admin);
