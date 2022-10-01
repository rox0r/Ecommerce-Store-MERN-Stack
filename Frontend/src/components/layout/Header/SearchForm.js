import React, { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./SearchForm.css";
import { useHistory } from "react-router-dom";

const SearchForm = ({ showForm, toggleHandler }) => {
  const history = useHistory();

  const [query, setQuery] = useState("");
  const searchRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    setQuery(searchRef.current.value);

    if (query.trim()) {
      history.push(`/products/${query}`);
    } else {
      history.push("/products");
    }
    searchRef.current.value = "";
  };

  return (
    <>
      {showForm && (
        <div className="searchFrom-container">
          <form className="searchForm" onSubmit={submitHandler}>
            <input
              ref={searchRef}
              className="search-field"
              name="search"
              type="text"
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-form-btn" type="submit">
              <FontAwesomeIcon
                className="search-icon"
                icon={faMagnifyingGlass}
              />
            </button>
          </form>
          <button
            className="search-form-btn"
            type="button"
            onClick={toggleHandler}
          >
            <FontAwesomeIcon className="search-icon" icon={faXmark} />
          </button>
        </div>
      )}
    </>
  );
};
export default SearchForm;
