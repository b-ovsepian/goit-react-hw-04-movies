import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Styles from "./Form.module.css";

const Form = ({ search, setSearch, onHandlerSearch, getMovies }) => {
  const history = useHistory();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    getMovies(search);
    history.push({ ...location, search: `?movie=${search}` });
    setSearch("");
  };

  return (
    <div className={Styles.Searchbar}>
      <form onSubmit={submitHandler} className={Styles.SearchForm}>
        <input
          type="text"
          className={Styles.SearchFormInput}
          name="search"
          placeholder="Search movie"
          autoComplete="off"
          autoFocus
          value={search}
          onChange={onHandlerSearch}
        ></input>
        <button type="submit" className={Styles.SearchFormButton}></button>
      </form>
    </div>
  );
};

export default Form;
