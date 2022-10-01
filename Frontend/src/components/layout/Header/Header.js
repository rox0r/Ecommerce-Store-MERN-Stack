import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

import Abutton from "../../UI/Abutton";
import Dropdown from "./Dropdown";
import SearchForm from "./SearchForm";

import brandLogo from "../../../Assets/images/brand-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const history = useHistory();
  const cartQuantity = useSelector((store) => store.cart.cartQuantity);

  const [showForm, setShowForm] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const searchToggleHandler = () => {
    setShowLinks(false);
    setShowForm((prev) => !prev);
  };

  const onClickHandler = () => {
    setShowForm(false);
    setShowLinks((prev) => !prev);
  };

  const linkRouting = (route) => {
    setShowLinks(false);
    history.push(route);
  };

  const pageLinkClasses = showLinks
    ? "page-links"
    : "page-links hidden-page-links";

  return (
    <>
      <div className="header">
        <div className="header_container">
          <div className="header-announcement">
            <p>Hurry! Get 20% Off. Usecode: NEWBIE</p>
          </div>
          <div className="navbar">
            <div className="hamburger-container" onClick={onClickHandler}>
              {!showLinks ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon className="search-icon" icon={faXmark} />
              )}
            </div>
            <div className="brand-logo-container">
              <Link className="brand_link" to="/">
                <img className="brand_logo" src={brandLogo} alt="brand logo" />
              </Link>
            </div>

            <div className={pageLinkClasses}>
              <p className="nav_link" onClick={linkRouting.bind(this, "/")}>
                HOME
              </p>
              <p
                className="nav_link"
                onClick={linkRouting.bind(this, "/temp-link")}
              >
                ABOUT
              </p>
              <p
                className="nav_link"
                onClick={linkRouting.bind(this, "/products")}
              >
                PRODUCTS
              </p>
            </div>

            <div className="nav-actions">
              <div className="search">
                <button
                  className="search-btn"
                  type="button"
                  onClick={searchToggleHandler}
                >
                  <FontAwesomeIcon
                    className="search-icon"
                    icon={faMagnifyingGlass}
                  />
                </button>
              </div>
              <div className="account-dropdown">
                <Dropdown className="nav_link" />
              </div>
              <div className="actions">
                <Abutton href="/cart" className="cart-pill abtn-sm">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p className="quantity">{cartQuantity}</p>
                </Abutton>
              </div>
            </div>
          </div>
          <SearchForm showForm={showForm} toggleHandler={searchToggleHandler} />
        </div>
      </div>
    </>
  );
};

export default Header;
