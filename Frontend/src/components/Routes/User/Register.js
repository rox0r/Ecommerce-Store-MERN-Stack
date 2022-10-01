import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { userRequest } from "../../../store/userSlice";
import Button from "../../UI/Button";
import FeedbackMsg from "../../UI/Feedback/FeedbackMsg";
import FormInputGroup from "../../UI/formInputGroup.js/FormInputGroup";

import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [feebackOpacity, setFeebackOpacity] = useState(0);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const userDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // const dummyUser = {
    //   name: "e",
    //   email: "e@gmail.com",
    //   password: "123456789",
    // };

    const isSuccess = await dispatch(userRequest("register", userDetails));
    if (isSuccess) {
      history.replace("/products");
    } else {
      setFeebackOpacity(1);
      setTimeout(() => {
        setFeebackOpacity(0);
      }, 1500);
    }
  };

  return (
    <div className="section">
      <div className="registerContainer container">
        <div className="registerForm-wrapper">
          <h1>Register</h1>
          <form className="registerForm" onSubmit={onSubmitHandler}>
            <FormInputGroup
              className="registerForm-group"
              label="Name"
              htmlFor="name"
              type="text"
              required="true"
            />
            <FormInputGroup
              className="registerForm-group"
              label="Email"
              htmlFor="email"
              type="email"
              required="true"
            />
            <FormInputGroup
              className="registerForm-group"
              label="Password"
              htmlFor="password"
              type="password"
              required="true"
            />
            <Button className="btn" type="submit" onClick="">
              Register
            </Button>
          </form>
          <p className="link-to-login">
            Already have an account?&nbsp;
            <Link to="/login">
              <u>Login!</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
