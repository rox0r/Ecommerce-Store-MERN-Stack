import "./Card.css";

const Card = (props) => {
  return (
    <>
      <div className="product-card">
        <div className="img-container">
          <img className="img" src={props.images[0].url} alt="product" />
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
