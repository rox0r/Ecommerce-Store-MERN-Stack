import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/userSlice";
import Button from "../../UI/Button";
import FormInputGroup from "../../UI/formInputGroup.js/FormInputGroup";
import "./ResetPassword.css";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    const passwordsObj = {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (passwordsObj.password !== passwordsObj.confirmPassword) {
      console.log("Error passwords don't match");
      return;
    }

    dispatch(resetPassword(passwordsObj, match.params.token));
  };

  //Add use effect - to show appropriate feedback and redirect accordingly

  return (
    <div className="section">
      <div className="resetPassword container">
        <div className="resetPassword-form-wrapper">
          <h1>Reset Password</h1>
          <form className="resetPassword-form" onSubmit={submitHandler}>
            <FormInputGroup
              className="form-group"
              label="Password"
              htmlFor="password"
              type="password"
              minlength="8"
              required="true"
            />
            <FormInputGroup
              className="form-group"
              label="Confirm Password"
              htmlFor="confirmPassword"
              type="password"
              minlength="8"
              required="true"
            />
            <Button className="btn" type="submit" onClick={() => {}}>
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
