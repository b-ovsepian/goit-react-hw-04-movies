import React, { useState, useEffect } from "react";
import List from "../../Components/List/List";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import { getMoviesTrending } from "../../Services/Services";
import Styles from "./Home.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoader(true);
    getMoviesTrending()
      .then(({ data }) => setMovies(data.results))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className={Styles.home}>
      <h1>Tranding today</h1>
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

export default Home;
