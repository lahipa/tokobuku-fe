import React from "react";
import configureStore from "./store/configure/configureStore";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { GlobalStyle } from "./templates/layout/styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//import { createStore, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk";

// const logger = (store) => {
//   return (next) => {
//     return (action) => {
//       console.group(action.type);
//       console.log("[Middleware] Dispatching", action);
//       const result = next(action);
//       console.log("[Middleware] next state", store.getState());
//       console.groupEnd();
//       return result;
//     };
//   };
// };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(logger, thunk))
// );

const store = configureStore();

const renderApp = () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <CssBaseline />

        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            maxSnack={3}
          >
            <App />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
