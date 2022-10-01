import React from "react";
import { Link } from "react-router-dom";
import "./Abutton.css";

const Abutton = (props) => {
  const classesStr = `abtn ${props.className}`;
  return (
    <Link to={props.href} className={classesStr}>
      {props.children}
    </Link>
  );
};

export default Abutton;
