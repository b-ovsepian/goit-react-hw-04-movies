import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { getMoviesReviews } from "../../Services/Services";
import Styles from "./Reviews.module.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const params = useParams().id;

  useEffect(() => {
    setLoader(true);
    getMoviesReviews(params)
      .then(({ data }) => setReviews(data.results))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoader(false);
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
        <ul className={Styles.list}>
          {reviews.length > 0 ? (
            reviews.map((result) => (
              <li className={Styles.item} key={result.id}>
                <h3 className={Styles.title}>{result.author}</h3>
                <p className={Styles.text}>{result.content}</p>
              </li>
            ))
          ) : (
            <li className={Styles.text}>
              We do not have any reviews for this movie.
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Reviews;
