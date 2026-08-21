import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localstorage";

import Cartreducer from "./reducers/index.jsx";

import "./index.css";
import App from "./App.jsx";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    orders: Cartreducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
