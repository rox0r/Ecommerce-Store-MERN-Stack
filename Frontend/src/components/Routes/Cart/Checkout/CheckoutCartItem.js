import "./CheckoutCartItem.css";

const CheckoutCartItem = ({ cartItem }) => {
  return (
    <div className="checkout-cart-details">
      <div className="img">Image</div>
      <div className="details">
        <div className="details-item product-name">{cartItem.name}</div>
        <div className="details-item">
          ₹{cartItem.price} &times; {cartItem.quantity}
        </div>
        <div className="details-item">
          Subtotal: ₹{cartItem.price * cartItem.quantity}
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
