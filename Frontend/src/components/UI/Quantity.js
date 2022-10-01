import React from "react";
import Button from "./Button";
import "./Quantity.css";

const Quantity = (props) => {
  const productId = props.productId;

  const incrementHandler = () => {
    props.changeQuantity(productId, "increase");
  };

  const decrementHandler = () => {
    props.changeQuantity(productId, "decrease");
  };

  return (
    <div className="quantitySelector">
      <Button
        className={`${props.btnClasses} decrement btn btn-sm`}
        type="button"
        disabled={props.value > 1 ? false : true}
        onClick={decrementHandler}
      >
        -
      </Button>
      <input type="number" value={props.value} readOnly />
      <Button
        className={`${props.btnClasses} increment btn btn-sm`}
        type="button"
        disabled={props.value < props.stock ? false : true}
        onClick={incrementHandler}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
