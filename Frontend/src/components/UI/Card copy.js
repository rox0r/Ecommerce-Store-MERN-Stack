import "./Card.css";
import newProductImage from "../../Assets/images/tshirt-images/coral-green.webp";

const Card = (props) => {
  return (
    <>
      <div className="product-card">
        <div className="img"></div>
        <div className="details">
          <h3></h3>
          <h3></h3>
        </div>
      </div>

      <div className="card-container">
        <div className="product-card">
          <div>
            <img className="img" src={newProductImage} alt="product" />
          </div>
          <div className="details">
            <div className="name">
              <p>{props.name}</p>
            </div>
            <div className="price">
              <strong>₹{props.price}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
