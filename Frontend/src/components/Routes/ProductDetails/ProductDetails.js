import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./ProductDetails.css";

import { getProductDetails, productActions } from "../../../store/productSlice";
import { addToCart } from "../../../store/cartSlice";

import Quantity from "../../UI/Quantity";
import Button from "../../UI/Button";
import FeedbackMsg from "../../UI/Feedback/FeedbackMsg";

import tshirtImage from "../../../Assets/images/tshirt.jpg";

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const product = useSelector((store) => store.product.product);
  const isLoading = useSelector((store) => store.product.isLoading);

  const [quantity, setQuantity] = useState(1);
  const [feebackOpacity, setFeebackOpacity] = useState(0);

  const productImage = product.images ? product.images[0].url : "";

  useEffect(() => {
    dispatch(getProductDetails(params.productId));
  }, [dispatch, params.productId]);

  const onClickHandler = () => {
    dispatch(addToCart(product._id, quantity));
    setFeebackOpacity(1);
    setTimeout(() => {
      setFeebackOpacity(0);
    }, 1500);
  };

  const changeQuantity = (productId, changeType) => {
    setQuantity((prev) => {
      if (changeType === "increase" && prev < product.stock) {
        return prev + 1;
      }

      if (changeType === "decrease" && prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };

  return (
    <div className="section">
      {!isLoading && (
        <div className="productDetails container">
          <div className="productImages">
            <img
              className="img"
              src={productImage}
              alt={product.category}
            ></img>
          </div>
          <div className="details">
            <div>
              <h2>{product.name}</h2>
              <hr />
              <p className="price">INR ₹{product.price}</p>
              <p>Description:</p>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                <b>Category: </b>
                {product.category}
              </p>
              <div className="quantity">
                <p>
                  <strong>Quantity: </strong>
                </p>
                <Quantity
                  stock={product.stock}
                  value={quantity}
                  changeQuantity={changeQuantity}
                ></Quantity>
              </div>
              <Button
                className="cart-cta btn"
                type="button"
                disabled={false}
                onClick={onClickHandler}
              >
                Add to Cart
              </Button>
              <FeedbackMsg
                opacity={feebackOpacity}
                className="feedbackMsg primaryMsg"
              >
                Item added to cart
              </FeedbackMsg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
