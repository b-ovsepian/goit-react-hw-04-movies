import React from "react";
import { Link, useLocation } from "react-router-dom";
import Styles from "./List.module.css";

const List = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={Styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={Styles.item}>
          <Link
            className={Styles.link}
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location },
            }}
          >
            <img
              className={Styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                  : `https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148086227.jpg`
              }
              alt={movie.title || movie.name}
              width="400"
            />
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
