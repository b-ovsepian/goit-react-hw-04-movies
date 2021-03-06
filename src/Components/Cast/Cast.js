import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { getMoviesCredits } from "../../Services/Services";
import Styles from "./Cast.module.css";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const params = useParams().id;
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  useEffect(() => {
    setLoader(true);
    getMoviesCredits(params)
      .then(({ data }) => setCast(data.cast))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoader(false);
        executeScroll();
      });
  }, []);

  return (
    <>
      {loader && <Loader />}
      {error && (
        <Error>
          <h2>{error}</h2>
        </Error>
      )}
      {!loader && !error && (
        <ul className={Styles.list} ref={myRef}>
          {cast.length > 0 ? (
            cast.map((actor) => (
              <li className={Styles.item} key={actor.cast_id}>
                <img
                  className={Styles.img}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w400${actor.profile_path}`
                      : `https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148086227.jpg`
                  }
                  alt={actor.name}
                />
                <h3 className={Styles.name}>{actor.name}</h3>
                {actor.character && (
                  <span className={Styles.character}>
                    Character:{actor.character}
                  </span>
                )}
              </li>
            ))
          ) : (
            <li className={Styles.text}>
              We do not have any actors for this movie.
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Cast;
