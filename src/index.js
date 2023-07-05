import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {Amplify} from "aws-amplify";

import awsConfig from "./config/cognito-config";

import reportWebVitals from "./reportWebVitals";
import Router from "./router";

import "./index.css";
import "./App.scss"

Amplify.configure(awsConfig);

const rootElement = document.getElementById("root"),
  root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
/*
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
