import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <section>
      <div className="container footer">
        <div className="footer_content">
          <div className="footer_grid">
            <div className="grid_item">
              <ul>
                <li>
                  <Link to="/temp-link">Shipping</Link>
                </li>
                <li>
                  <Link to="/temp-link">Return</Link>
                </li>
                <li>
                  <Link to="/temp-link">Refund</Link>
                </li>
              </ul>
            </div>
            <div className="grid_item">
              <ul>
                <li>
                  <Link to="/temp-link">Privacy</Link>
                </li>
                <li>
                  <Link to="/temp-link">Security</Link>
                </li>
                <li>
                  <Link to="/temp-link">Cookies</Link>
                </li>
              </ul>
            </div>
            <div className="grid_item">
              <ul>
                <li>
                  <Link to="/temp-link">About Us</Link>
                </li>
                <li>
                  <Link to="/temp-link">Contact Us</Link>
                </li>
                <li>
                  <Link to="/temp-link">FAQ's</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">Copyright &copy; 2022</div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
