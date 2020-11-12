import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <NavLink
            to="/"
            exact
            className={Styles.link}
            activeClassName={Styles.activeLink}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={Styles.link}
            activeClassName={Styles.activeLink}
          >
            Movies
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
