import React from "react";
import { useRoutes } from "react-router-dom/dist/index";
import App from "../App";
import Login from "../pages/Login";

const routes = [
  {
    path: "",
    element: <App />,
  },
  {
    path: "redirectURL",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

const Router = () => {
  return useRoutes([...routes]);
};

export default Router;
