import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import ProductFilters from "../Product/ProductFilters";

import { getProducts } from "../../store/productSlice";
import Card from "../UI/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./Products.css";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { products, isLoading, error, resultsPerPage, filteredProductsCount } =
    useSelector((store) => store.product);
  const [activePage, setActivePage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [category, setCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const query = match.params.query;

  useEffect(() => {
    dispatch(getProducts(query, activePage, priceRange, category));
  }, [dispatch, query, activePage, priceRange, category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateCurrentPageNo = (pageNo) => {
    setActivePage(pageNo);
  };

  const clearFilters = () => {
    setActivePage(1);
    setPriceRange([0, Infinity]);
    setCategory("");
  };

  const filterChangeHandler = () => {
    setShowFilter((prev) => !prev);
  };

  const filterClasses = showFilter ? "filters" : "filters hide-filters";

  return (
    <div className="section-products">
      <div className="container_fluid">
        <div className="filter-icon">
          {!showFilter ? (
            <FontAwesomeIcon icon={faFilter} onClick={filterChangeHandler} />
          ) : (
            <FontAwesomeIcon
              className="search-icon"
              icon={faXmark}
              onClick={filterChangeHandler}
            />
          )}
        </div>
        <div className="products-content">
          <ProductFilters
            className={filterClasses}
            setShowFilter={setShowFilter}
            setPriceRange={setPriceRange}
            setCategory={setCategory}
            clearFilters={clearFilters}
          />
          <div className="products-inner">
            <div className="products-items">
              {products.map((p) => {
                return (
                  <Link to={`/product/${p._id}`} key={p._id}>
                    <Card name={p.name} price={p.price} />
                  </Link>
                );
              })}
            </div>
            <div className="pagination">
              {filteredProductsCount > resultsPerPage && (
                <Pagination
                  activePage={activePage}
                  itemsPerPage={resultsPerPage}
                  totalItemsCount={filteredProductsCount}
                  onChange={updateCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  itemClass="item-page"
                  activeClass="item-page-active"
                  linkClass="link-page"
                  activeLinkClass="link-page-active"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
