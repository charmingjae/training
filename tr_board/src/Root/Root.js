import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { hot } from "react-hot-loader";

// import css
import { size, design, divBackground } from "./Root.module.css";
// import component
import { LogoutButton } from "../Components";
// import pages
import { LoginForm, Main, RegisterForm } from "../Pages";
// import function
import { signIn } from "../Function";
import { signUp } from "../Function";

const Root = () => {
  // init user const
  const [user, setUser] = useState(null);

  // init check login
  const authenticated = user != null;

  // Login Function
  const doLogin = async ({ userID, userPW }) => {
    // Set User using returned value : user
    // setUser(signIn({ userID, userPW }));
    var getSigninResult = await signIn({ userID, userPW });
    // console.log("[Root.js] success getSigninResult: ", getSigninResult);
    if (getSigninResult === undefined) {
      // alert("failed login");
      // console.log("[Root.js] failed getSigninResult : ", getSigninResult);
      return undefined;
    } else {
      setUser(getSigninResult);
      return true;
    }
  };

  // const doRegister = ({ userID, userPW, userPhone }) => {
  //   setUser(signUp({ userID, userPW, userPhone }));
  // };
  const doRegister = async ({ userID, userPW, userPhone }) => {
    var getSignupResult = await signUp({ userID, userPW, userPhone });
    if (getSignupResult === undefined) {
      // alert("failed login");
      // console.log("[Root.js] failed getSigninResult : ", getSigninResult);
      return undefined;
    } else {
      setUser(getSignupResult);
      return true;
    }
  };

  // Logout const
  const doLogout = () => setUser(null);

  // return
  return (
    <Router>
      <header>
        <div className={divBackground}>
          <Link to="/">
            <button className={`${size} ${design}`}>Main</button>
          </Link>

          {authenticated ? (
            // console.log("[ROOT user] : ", user)
            <LogoutButton logout={doLogout} username={user} />
          ) : (
            // <LogoutButton logout={doLogout} username={user} />
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Main} />
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
        </Switch>
      </main>
    </Router>
  );
};

export default hot(module)(Root);
