import React, { useState, useEffect } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";

// import css
import { size, otherDesign, mainDesign } from "./Root.module.css";
// import component
import { LogoutButton, MyinfoButton, AdminButton } from "../Components";
// import pages
import { LoginForm, Main, RegisterForm, UserInfo, Admin } from "../Pages";
// import function
import { signIn } from "../Function";
import { signUp } from "../Function";

const Root = () => {
  // init user const
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  // init check login
  const authenticated = user != null;
  // Login Function
  const doLogin = async ({ userID, userPW }) => {
    var getSigninResult = await signIn({ userID, userPW });
    if (getSigninResult === undefined) {
      return undefined;
    } else {
      setUser(getSigninResult.userID);
      setUserAuth(getSigninResult.userAuth);
      return true;
    }
  };
  // Register Function
  const doRegister = async ({ userID, userPW, userPhone }) => {
    var getSignupResult = await signUp({ userID, userPW, userPhone });
    if (getSignupResult === undefined) {
      return undefined;
    } else {
      setUser(getSignupResult);
      return true;
    }
  };
  // Logout Function
  const doLogout = () => {
    setUser(null);
    setUserAuth(null);
  };

  // return
  return (
    <Router>
      <header>
        <div>
          <Link to="/" className={`${mainDesign}`}>
            <button className={`${size} ${mainDesign}`}>Basket</button>
          </Link>

          {authenticated ? (
            <>
              <LogoutButton logout={doLogout} username={user} />
              <Link to="/userinfo">
                <MyinfoButton username={user} />
              </Link>
              {userAuth === "admin" ? (
                <Link to="/admin">
                  <AdminButton />
                </Link>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Link to="/register">
                <button className={`${size} ${otherDesign}`}>Register</button>
              </Link>
              <Link to="/login">
                <button className={`${size} ${otherDesign}`}>Login</button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Switch>
          {/* <Route exact path="/" component={Main} /> */}
          <Route
            exact
            path="/"
            render={(props) => (
              <Main authenticated={authenticated} user={user} {...props} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <LoginForm
                authenticated={authenticated}
                login={doLogin}
                {...props}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <RegisterForm
                authenticated={authenticated}
                register={doRegister}
                {...props}
              />
            )}
          />
          <Route
            path="/userinfo"
            render={(props) => <UserInfo user={user} {...props} />}
          />
          <Route
            path="/admin"
            render={(props) => <Admin user={user} {...props} />}
          />
        </Switch>
      </main>
    </Router>
  );
};

export default hot(module)(Root);
