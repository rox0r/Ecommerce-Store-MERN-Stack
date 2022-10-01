import FormInputGroup from "../UI/formInputGroup.js/FormInputGroup";
import "./ProductFilters.css";

import Button from "../UI/Button";
import { useState } from "react";

const categories = ["Shoes", "Tshirt", "Jacket"];

const ProductFilters = (props) => {
  const [activeCategory, setActiveCategory] = useState("");

  const rangeChangeHandler = (e) => {
    e.preventDefault();
    props.setShowFilter(false);
    const newPriceRange = [
      e.target.minPrice.value || 0,
      e.target.maxPrice.value || Infinity,
    ];
    props.setPriceRange(newPriceRange);
  };

  const onClickHandler = (category) => {
    setActiveCategory(category);
    props.setCategory(category);
  };

  const clearhandler = () => {
    setActiveCategory("");
    props.clearFilters();
  };

  return (
    <div className={props.className}>
      <h2>Filters</h2>
      <hr />
      <div>
        <h4>Categories</h4>
        <ul className="category-list">
          {categories.map((category) => {
            return (
              <li
                className={
                  activeCategory === category ? "active-category link" : "link"
                }
                key={category}
                name={category}
                onClick={onClickHandler.bind(this, category)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      <h4>Price</h4>
      <form className="filterForm" onSubmit={rangeChangeHandler}>
        <FormInputGroup
          className="form-item"
          htmlFor="minPrice"
          label="Minimum Price"
          type="Number"
        />
        <FormInputGroup
          className="form-item"
          htmlFor="maxPrice"
          label="Maximum Price"
          type="Number"
        />
        <Button
          className="btn btn-sm form-item"
          type="submit"
          onClick={() => {}}
        >
          Apply
        </Button>
      </form>
      <Button className="btn btn-sm clear" type="button" onClick={clearhandler}>
        Clear Filters
      </Button>
    </div>
  );
};

export default ProductFilters;
