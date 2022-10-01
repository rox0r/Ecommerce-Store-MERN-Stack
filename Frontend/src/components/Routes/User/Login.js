import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userRequest } from "../../../store/userSlice";
import Button from "../../UI/Button";
import FormInputGroup from "../../UI/formInputGroup.js/FormInputGroup";
import "./Login.css";

const Login = ({ match, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((store) => store.user);
  const redirectUrl = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = async (event) => {
    event.preventDefault();

    const loginDetails = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    dispatch(userRequest("login", loginDetails));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push(redirectUrl);
    }
    window.scrollTo(0, 0);
  }, [history, redirectUrl, isLoggedIn]);

  return (
    <div className="section">
      <div className="loginContent container">
        <div className="loginForm-wrapper">
          <h1>Login</h1>
          <form className="loginForm" onSubmit={submitHandler}>
            <FormInputGroup
              className="loginForm-group"
              label="Email"
              htmlFor="email"
              type="email"
              required="true"
              defaultValue="dummy@test.com"
            />
            <FormInputGroup
              className="loginForm-group"
              label="Password"
              htmlFor="password"
              type="password"
              minlength="8"
              required="true"
              defaultValue={12345678}
            />
            <Button className="btn" type="submit" onClick={() => {}}>
              Login
            </Button>
          </form>
          <p className="link-to-register">
            Don't have an account?&nbsp;
            <Link to="/register">
              <u>Sign Up!</u>
            </Link>
          </p>
          <Link to="/password/forgot">
            <u>Forgot password</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
