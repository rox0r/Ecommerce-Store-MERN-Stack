import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";

import CheckoutCartItem from "./CheckoutCartItem";
import Abutton from "../../../UI/Abutton";

const Checkout = () => {
  const { user } = useSelector((store) => store.user);
  const { cartItems, cartAmount, shippingInfo } = useSelector(
    (store) => store.cart
  );
  const { address, city, state, country, pincode } = shippingInfo;

  const completeAddress =
    address + ", " + city + ", " + state + ", " + country + ", " + pincode;

  const tax = cartAmount * 0.18;
  const shippingCost = 300;
  const totalAmount = cartAmount + tax + shippingCost;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section">
      <div className="checkout-container container">
        <h1 className="heading">Checkout</h1>
        <hr />
        <div className="checkout-content">
          <div className="checkout-summary">
            <div className="shipping">
              <h3 className="heading">Shipping Details</h3>
              <div>
                <p>Name:</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p>Phone:</p>
                <p>{shippingInfo.phone}</p>
              </div>
              <div>
                <p>Address:</p>
                <p>{completeAddress}</p>
              </div>
            </div>
            <hr />
            <div className="cart">
              <h3>Cart Details</h3>
              {cartItems.map((v) => {
                return (
                  <>
                    <CheckoutCartItem key={v.productId} cartItem={v} />
                  </>
                );
              })}
            </div>
          </div>
          <div className="total-summary">
            <h3>Order Summary</h3>
            <hr />
            <div className="item">
              <p>Subtotal: </p>
              <p>₹{cartAmount}</p>
            </div>
            <div className="item">
              <p>Tax: </p>
              <p>₹{tax}</p>
            </div>
            <div className="item">
              <p>Shipping</p>
              <p>₹{shippingCost}</p>
            </div>
            <div className="item total">
              <h3>Total: </h3>
              <h3>₹{totalAmount}</h3>
            </div>

            <Abutton className="checkout-action btn" href="/order/success">
              Place Order
            </Abutton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
