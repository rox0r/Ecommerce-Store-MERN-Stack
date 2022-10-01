import React from "react";
import Abutton from "../UI/Abutton";

import "./Theory.css";

import shoesImage from "../../Assets/images/home-page/shoes.png";
import tshirtImage from "../../Assets/images/home-page/tshirt.png";
import jacketImg from "../../Assets/images/home-page/jacket.png";

const Theory = () => {
  return (
    <div className="section">
      <div className="home_theories container_fluid">
        <div className="home_theory item1">
          <div className="theory_img_container">
            <img src={shoesImage} className="theory_img" alt="shoes" />
          </div>
          <div className="theory_details_container">
            <h1>Shoes</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="home_theory item2">
          <div className="theory_img_container">
            <img src={tshirtImage} className="theory_img" alt="tshirt" />
          </div>
          <div className="theory_details_container">
            <h1>Tshirts</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="home_theory item3">
          <div className="theory_img_container">
            <img src={jacketImg} className="theory_img" alt="jacket" />
          </div>
          <div className="theory_details_container">
            <h1>Jackets</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="theory_cta">
          <Abutton href="/products">Explore All Products</Abutton>
        </div>
      </div>
    </div>
  );
};

export default Theory;
