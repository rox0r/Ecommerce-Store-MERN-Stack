import React from "react";
import Abutton from "../UI/Abutton";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="section">
      <div className="hero_container">
        <div className="hero_content">
          <div className="hero_msg">
            <p className="hero_jumbotron">Latest Designs</p>
            <p>At Affordable Prices</p>
            <div className="hero_cta">
              <Abutton href="/products">Explore Products</Abutton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
