import React from "react";
import LoaderSpinner from "react-loader-spinner";
import Styles from "./Loader.module.css";

const Loader = () => {
  return (
    <LoaderSpinner
      className={Styles.loader}
      type="ThreeDots"
      color="#3f51b5"
      height={100}
      width={100}
    />
  );
};

export default Loader;
