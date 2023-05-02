import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, Link } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(userData.user)); // store the user object in local storage
        //localStorage.setItem("userId", userData._id); // store the user id in local storage
      } else {
        console.log('localStorage is not supported');
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                <Link component={RouterLink} to="/register" className="link"> {/* Use the RouterLink component to link to /register */}
                  Create a New Account
                </Link>
              )}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

