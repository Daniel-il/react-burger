import { TWsActionMessage } from "../types/utils";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE";
export const WS_CONNECTION_START_WITH_USER = "WS_CONNECTION_START_WITH_USER";
export interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsInitWithUser: typeof WS_CONNECTION_START_WITH_USER;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

interface IWsConnectionStartAction {
  type: typeof WS_CONNECTION_START;
}
interface IWsConnectionSuccessAction {
  type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionErrorAction {
  type: typeof WS_CONNECTION_ERROR;
}
interface IWsGetMessageAction {
  payload: TWsActionMessage;
  type: typeof WS_GET_MESSAGE;
}
interface IWsSendMessageAction {
  type: typeof WS_SEND_MESSAGE;
}
interface IWsConnectionStartWithUserAction {
  type: typeof WS_CONNECTION_START_WITH_USER;
  payload: string;
}
interface IWsConnectionCloseAction {
  type: typeof WS_CONNECTION_CLOSED;
}
export type TWsActions =
  | IWsConnectionErrorAction
  | IWsConnectionStartAction
  | IWsConnectionStartWithUserAction
  | IWsConnectionSuccessAction
  | IWsGetMessageAction
  | IWsSendMessageAction
  | IWsConnectionCloseAction;

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (
  message: TWsActionMessage
): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
export const wsInitWithUser = (
  url: string
): IWsConnectionStartWithUserAction => {
  return {
    type: WS_CONNECTION_START_WITH_USER,
    payload: url,
  };
};
