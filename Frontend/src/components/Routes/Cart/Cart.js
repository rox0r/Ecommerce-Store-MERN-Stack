import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Cart.css";
import CartItem from "../../CartItem/CartItem";
import Abutton from "../../UI/Abutton";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);

  const cartAmount = cartItems.reduce((t, p) => {
    return t + p.price * p.quantity;
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="cart-content">
          <h1>Cart</h1>
          <hr />
          {cartItems.length !== 0 && (
            <div className="cart-products">
              <div className="cart-products-item heading">
                <div></div>
                <div className="details">
                  <div className="details-item">
                    <h4>Name</h4>
                  </div>
                  <div className="details-item">
                    <h4>Price</h4>
                  </div>
                  <div className="details-item">
                    <h4>Quantity</h4>
                  </div>
                  <div className="details-item">
                    <h4>Subtotal</h4>
                  </div>
                  <div className="details-item"></div>
                </div>
              </div>
              {cartItems.map((item) => {
                return <CartItem key={item.productId} item={item} />;
              })}
            </div>
          )}

          {cartItems.length === 0 && (
            <>
              <div className="emptyCart">No items in the cart</div>
              <Abutton className="emptyCart" href="/products">
                Explore Products
              </Abutton>
            </>
          )}
          {cartItems.length !== 0 && (
            <>
              <div className="cart-amount">
                <h3>Total</h3>
                <h3>₹{cartAmount}</h3>
              </div>
              <div className="cart-action">
                <Abutton
                  href="/login?redirect=shipping"
                  className="checkout btn"
                >
                  Checkout
                </Abutton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
