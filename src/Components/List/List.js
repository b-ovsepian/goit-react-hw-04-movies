import React from "react";
import { NavLink } from "react-router-dom";
import Styles from "./List.module.css";

const List = ({ movies }) => {
  return (
    <ul className={Styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={Styles.item}>
          <NavLink
            className={Styles.link}
            to={`/movies/${movie.id}`}
            // className={Styles.link}
            // activeClassName={Styles.active}
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
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default List;
