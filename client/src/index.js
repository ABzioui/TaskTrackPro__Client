import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

const store = configureStore({
  reducer: {
    global: globalReducer, // Reducer global pour gérer l'état global de l'application
    [api.reducerPath]: api.reducer, // Reducer pour gérer les appels API
  },
  middleware: (getDefault) => getDefault().concat(api.middleware), // Middleware pour gérer les appels API asynchrones
});
setupListeners(store.dispatch); // Configuration des écouteurs Redux

const root = ReactDOM.createRoot(document.getElementById("root")); // Création de l'élément racine React
root.render(
  // Rendu de l'application React
  <React.StrictMode>
    <Provider store={store}>
      {/* Fourniture du store Redux à l'application */}
      <App /> {/* Composant racine de l'application */}
    </Provider>
  </React.StrictMode>
);
