import React, { useState, useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { getMoviesId } from "../../Services/Services";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Switch, Route, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Styles from "./SingleMovie.module.css";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";

const SingleMovie = () => {
  const [movie, setMovie] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();
  const params = useParams().id;
  const match = useRouteMatch();

  useEffect(() => {
    setLoader(true);
    getMoviesId(params)
      .then(({ data }) => setMovie(data))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const {
    id,
    title,
    genres,
    release_date,
    vote_average,
    overview,
    poster_path,
  } = movie;

  return (
    <>
      {loader && <Loader />}
      {error && (
        <Error>
          <h2>{error}</h2>
        </Error>
      )}
      {movie && !loader && !error && (
        <div className={Styles.SingleMovie}>
          <button
            type="button"
            className={Styles.btn}
            onClick={goBack}
          ></button>
          <div key={id} className={Styles.movieBox}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : `https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148086227.jpg`
              }
              alt={title}
              width="300"
              className={Styles.img}
            />
            <div className={Styles.movieInfo}>
              <h2 className={Styles.movieTitle}>
                {title}({parseInt(release_date)})
              </h2>
              <p>User Score: {vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres.map((genre) => genre.name).join(" ")}</p>
            </div>
          </div>
          <AppBar position="static">
            <Toolbar variant="dense">
              <NavLink
                to={`/movies/${params}/cast`}
                replace
                className={Styles.link}
                activeClassName={Styles.activeLink}
              >
                Cast
              </NavLink>
              <NavLink
                to={`/movies/${params}/reviews`}
                replace
                className={Styles.link}
                activeClassName={Styles.activeLink}
              >
                Reviews
              </NavLink>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/movies/:id/cast" component={Cast}></Route>
            <Route exact path="/movies/:id/reviews" component={Reviews}></Route>
          </Switch>
        </div>
      )}
    </>
  );
};

export default SingleMovie;
