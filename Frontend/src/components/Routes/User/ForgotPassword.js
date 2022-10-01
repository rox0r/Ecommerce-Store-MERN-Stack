import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, userActions } from "../../../store/userSlice";
import Button from "../../UI/Button";
import FeedbackMsg from "../../UI/Feedback/FeedbackMsg";
import FormInputGroup from "../../UI/formInputGroup.js/FormInputGroup";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [feebackOpacity, setFeebackOpacity] = useState(0);
  const { success, hasError, userMessage } = useSelector((state) => state.user);

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
    };
    dispatch(forgotPassword(data));
  };

  useEffect(() => {}, [success, hasError]);

  return (
    <div className="section">
      <div className="forgotPassword container">
        <div className="forgotPassword-inner">
          <h1>Forgot Password</h1>
          <form className="forgotPassword-form" onSubmit={submitHandler}>
            <FormInputGroup
              className="form-group"
              label="Email"
              htmlFor="email"
              type="email"
              required="true"
            />
            <Button className="btn" type="submit" onClick={() => {}}>
              Submit
            </Button>
          </form>
          {success && <div>{userMessage}</div>}
          {hasError && <div>{hasError}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
