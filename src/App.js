import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import SingleMovie from "./Components/SingleMovie/SingleMovie";
import Home from "./Containers/Home/Home";
import Movies from "./Containers/Movies/Movies";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/movies" component={Movies}></Route>
        <Route path="/movies/:id" component={SingleMovie}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
