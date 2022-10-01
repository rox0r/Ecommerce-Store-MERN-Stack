import "./Card.css";
import newProductImage from "../../Assets/images/250px.jpeg";

const Card = (props) => {
  return (
    <>
      <div className="product-card">
        <div className="img-container">
          <img className="img" src={newProductImage} alt="product" />
        </div>
        <div className="details">
          <div className="name">{props.name}</div>
          <h4>₹{props.price}</h4>
        </div>
      </div>
    </>
  );
};

export default Card;
