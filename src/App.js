import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "./routes";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/"></Redirect>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
