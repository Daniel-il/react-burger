import React from "react";
import { createRoot } from "react-dom/client";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_GET_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE, WS_CONNECTION_START_WITH_USER, IWsActions} from "./services/actions/wsActions";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions: IWsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitWithUser: WS_CONNECTION_START_WITH_USER,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
export const store = createStore(rootReducer, enhancer);
const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
reportWebVitals();
