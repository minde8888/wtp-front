import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");

let rerenderEntireTree = () => {
  ReactDOMClient.createRoot(rootElement).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
rerenderEntireTree();
