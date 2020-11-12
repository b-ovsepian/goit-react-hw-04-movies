import React, { useState, useEffect } from "react";
import Form from "../../Components/Form/Form";
import List from "../../Components/List/List";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import { getMoviesQuery } from "../../Services/Services";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const Movies = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (Object.keys(params).length) {
      getMovies(params.movie);
    }
  }, []);

  const handlerSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const getMovies = (search) => {
    if (search) {
      setError("");
      setLoader(true);
      getMoviesQuery(search)
        .then(({ data }) => {
          if (data.total_results > 0) {
            setMovies(data.results);
          } else setError("Movie not found! Try again...");
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoader(false));
    }
  };

  return (
    <div>
      <Form
        search={search}
        setSearch={setSearch}
        onHandlerSearch={handlerSearch}
        getMovies={getMovies}
      />
      {loader && <Loader />}
      {error && (
        <Error>
          <h2>{error}</h2>
        </Error>
      )}
      {!loader && !error && <List movies={movies} />}
    </div>
  );
};

export default Movies;
