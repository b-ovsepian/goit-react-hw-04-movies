import React, { useState, useEffect, Suspense } from "react";
import { singleRoutes } from "../../routes";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesId } from "../../Services/Services";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import { Switch, Route, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Styles from "./SingleMovie.module.css";

const SingleMovie = () => {
  const [movie, setMovie] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();
  const params = useParams().id;

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
    const { state } = location;
    if (state && state.from) {
      return history.push(state.from);
    }
    history.push("/");
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
                to={{
                  pathname: `/movies/${params}/cast`,
                  state: { ...location.state },
                }}
                replace
                className={Styles.link}
                activeClassName={Styles.activeLink}
              >
                Cast
              </NavLink>
              <NavLink
                to={{
                  pathname: `/movies/${params}/reviews`,
                  state: { ...location.state },
                }}
                replace
                className={Styles.link}
                activeClassName={Styles.activeLink}
              >
                Reviews
              </NavLink>
            </Toolbar>
          </AppBar>
          <Suspense fallback={<Loader />}>
            <Switch>
              {singleRoutes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default SingleMovie;
