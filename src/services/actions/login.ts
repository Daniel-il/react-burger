import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { TLoginRes, TUserData } from "../types/utils";

const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

interface ILoginAction {
  type: typeof LOGIN_REQUEST;
}
interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  user: TUserData;
  token: string;
  refreshToken: string;
}
interface ILoginFailedAction {
  type: typeof LOGIN_FAILED;
}
function loginAction(): ILoginAction {
  return {
    type: LOGIN_REQUEST,
  };
}
function loginSuccessAction(data: TLoginRes): ILoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    user: data.user,
    token: data.accessToken,
    refreshToken: data.refreshToken,
  };
}
function loginFailedAction(): ILoginFailedAction {
  return {
    type: LOGIN_FAILED,
  };
}
export type TLoginActions =
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction;

export const login: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginAction());
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(loginSuccessAction(res));
      })
      .catch((err) => {
        dispatch(loginFailedAction());
        console.log(err);
      });
  };
};

export { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED };
