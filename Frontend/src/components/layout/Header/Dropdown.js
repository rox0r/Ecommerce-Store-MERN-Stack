import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions, userLogout } from "../../../store/userSlice";
import "./Dropdown.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const logoutHandler = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <p className={`${props.className} dropdownBtn`}>
        <FontAwesomeIcon icon={faUser} />
      </p>
      <div className="dropdown-content">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="dropLink">
              Login
            </Link>
            <Link to="/register" className="dropLink">
              Register
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <p onClick={logoutHandler} className="dropLink">
              Logout
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Dropdown;
