import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../store/cartSlice";
import Button from "../UI/Button";
import Quantity from "../UI/Quantity";

import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const productId = item.productId;

  const changeQuantity = (productId, changeType) => {
    dispatch(updateCartQuantity(productId, changeType));
  };

  const deleteHandler = () => {
    dispatch(deleteCartItem(productId));
  };
  return (
    <div className="cart-products-item">
      <div className="img"></div>
      <div className="details">
        <div className="details-item product-name">
          <p>{item.name}</p>
        </div>
        <div className="details-item">
          <p>₹{item.price} / Item</p>
        </div>
        <div className="details-item">
          <Quantity
            btnClasses="btn-sm"
            stock={item.stock}
            value={item.quantity}
            productId={item.productId}
            changeQuantity={changeQuantity}
          />
        </div>
        <div className="details-item">
          <p>₹{item.price * item.quantity}</p>
        </div>
        <div className="details-item">
          <Button className="removeItem btn btn-sm" onClick={deleteHandler}>
            &times;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
