import { lazy } from "react";

export const routes = [
  {
    path: "/",
    label: "Home",
    exact: true,
    component: lazy(
      () => import("./Containers/Home/Home") /* webpackChunkName: "home-page" */
    ),
  },
  {
    path: "/movies",
    label: "Movies",
    exact: true,
    component: lazy(
      () =>
        import(
          "./Containers/Movies/Movies"
        ) /* webpackChunkName: "movies-page" */
    ),
  },
  {
    path: "/movies/:id",
    label: "SingleMovie",
    exact: false,
    component: lazy(
      () =>
        import(
          "./Containers/SingleMovie/SingleMovie"
        ) /* webpackChunkName: "singleMovie-page" */
    ),
  },
];

export const singleRoutes = [
  {
    path: "/movies/:id/cast",
    label: "Cast",
    exact: true,
    component: lazy(
      () =>
        import(
          "./Components/Cast/Cast"
        ) /* webpackChunkName: "cast-component" */
    ),
  },
  {
    path: "/movies/:id/reviews",
    label: "Reviews",
    exact: true,
    component: lazy(
      () =>
        import(
          "./Components/Reviews/Reviews"
        ) /* webpackChunkName: "reviews-component" */
    ),
  },
];
