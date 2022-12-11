import { Middleware, MiddlewareAPI } from "redux";
import { IWsActions } from "../actions/wsActions";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) =>
      (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsInitWithUser, onOpen, onClose, onError, onMessage } =
          wsActions;
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}`);
        }
        if (type === wsInitWithUser) {
          socket = new WebSocket(payload);
        }
        if (socket) {
          socket.onopen = (event: Event) => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = (event: Event) => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = (event: { data: string }) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onMessage, payload: restParsedData });
          };

          socket.onclose = (event: CloseEvent) => {
            dispatch({ type: onClose, payload: event });
          };
        }

        next(action);
      };
  };
};
