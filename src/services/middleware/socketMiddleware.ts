import { store } from "../..";
import { IWsActions } from "../actions/wsActions";
import { AppThunk } from "../types";
import { TOrderItem } from "../types/utils";

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;
    return (next: (arg0: any) => void) =>
      (action: { type: any; payload: any }) => {
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
          socket.onopen = (event: any) => {
            dispatch({ type: onOpen, payload: event });
          };

          socket.onerror = (event: any) => {
            dispatch({ type: onError, payload: event });
          };

          socket.onmessage = (event: { data: string }) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            dispatch({ type: onMessage, payload: restParsedData });
          };

          socket.onclose = (event: any) => {
            dispatch({ type: onClose, payload: event });
          };
        }

        next(action);
      };
  };
};
