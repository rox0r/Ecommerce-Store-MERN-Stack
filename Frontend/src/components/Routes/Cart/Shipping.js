import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userRequest } from "../../../store/userSlice";
import Button from "../../UI/Button";
import FormInputGroup from "../../UI/formInputGroup.js/FormInputGroup";
import { Country, State } from "country-state-city";
import "./Shipping.css";
import { addShippingInfo } from "../../../store/cartSlice";

const Shipping = ({ match, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingInfo } = useSelector((store) => store.cart);
  const [enteredCountry, setEnteredCountry] = useState(shippingInfo.country);
  const [enteredState, setEnteredState] = useState(shippingInfo.state);

  //   const redirectUrl = location.search
  //     ? location.search.split("=")[1]
  //     : "/products";

  const submitHandler = async (event) => {
    event.preventDefault();

    const shippingInfo = {
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      country: event.target.country.value,
      pincode: event.target.pincode.value,
      phone: event.target.phone.value,
    };

    const success = await dispatch(addShippingInfo(shippingInfo));
    if (success) {
      history.push("/checkout");
    }
  };

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       history.push(redirectUrl);
  //     }
  //     window.scrollTo(0, 0);
  //   }, [history, redirectUrl, isLoggedIn]);

  return (
    <div className="section">
      <div className="shipping-container container">
        <div className="shipping-form-wrapper">
          <h1 className="heading">Shipping Details</h1>
          <form className="shipping-form" onSubmit={submitHandler}>
            <div>
              <p>Country</p>
              <select
                name="country"
                value={enteredCountry}
                required
                onChange={(e) => setEnteredCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((v) => {
                    return (
                      <option key={v.isoCode} value={v.isoCode}>
                        {v.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <p>Address</p>
              <input
                name="address"
                type="text"
                placeholder="Address"
                defaultValue={shippingInfo.address}
                required
              />
            </div>
            <div>
              <p>City</p>
              <input
                name="city"
                type="text"
                placeholder="City"
                defaultValue={shippingInfo.city}
                required
              />
            </div>
            <div>
              <p>State</p>
              <select name="state" defaultValue={enteredState} required>
                <option value="">State</option>
                {State.getStatesOfCountry(enteredCountry).map((v) => {
                  return (
                    <option key={v.isoCode} value={v.isoCode}>
                      {v.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <p>Pincode</p>
              <input
                name="pincode"
                type="text"
                placeholder="Pincode"
                defaultValue={shippingInfo.pincode}
                required
              />
            </div>
            <div>
              <p>Phone</p>
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                defaultValue={shippingInfo.phone}
                required
              />
            </div>

            <Button className="btn" type="submit" onClick={() => {}}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
