import { baseUrl } from "../../utils/constants";
import { getCookie, checkResponse, deleteCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { TUserData } from "../types/utils";
const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" = "GET_USER_DATA_REQUEST";
const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" = "GET_USER_DATA_SUCCESS";
const GET_USER_DATA_FAILED: "GET_USER_DATA_FAILED" = "GET_USER_DATA_FAILED";
const CHANGE_USER_DATA_REQUEST: "CHANGE_USER_DATA_REQUEST" =
  "CHANGE_USER_DATA_REQUEST";
const CHANGE_USER_DATA_SUCCESS: "CHANGE_USER_DATA_SUCCESS" =
  "CHANGE_USER_DATA_SUCCESS";
const CHANGE_USER_DATA_FAILED: "CHANGE_USER_DATA_FAILED" =
  "CHANGE_USER_DATA_FAILED";
const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

interface IGetUserDataAction {
  type: typeof GET_USER_DATA_REQUEST;
}
interface IGetUserDataFailedAction {
  type: typeof GET_USER_DATA_FAILED;
}
interface IGetUserDataSuccessAction {
  type: typeof GET_USER_DATA_SUCCESS;
  user: TUserData | null;
}
function getUserDataAction(): IGetUserDataAction {
  return { type: GET_USER_DATA_REQUEST };
}
function getUserDataSuccessAction(data: {
  success: boolean;
  user: TUserData;
}): IGetUserDataSuccessAction {
  return { type: GET_USER_DATA_SUCCESS, user: data.user };
}
function getUserDataFailedAction(): IGetUserDataFailedAction {
  return {
    type: GET_USER_DATA_FAILED,
  };
}
interface IChangeUserDataAction {
  type: typeof CHANGE_USER_DATA_REQUEST;
}
interface IChangeUserDataFailedAction {
  type: typeof CHANGE_USER_DATA_FAILED;
}
interface IChangeUserDataSuccessAction {
  type: typeof CHANGE_USER_DATA_SUCCESS;
  user: TUserData;
}
function changeUserDataAction(): IChangeUserDataAction {
  return {
    type: CHANGE_USER_DATA_REQUEST,
  };
}
function changeUserDataFailedAction(): IChangeUserDataFailedAction {
  return {
    type: CHANGE_USER_DATA_FAILED,
  };
}
function changeUserDataSuccessAction(data: {
  success: boolean;
  user: TUserData;
}): IChangeUserDataSuccessAction {
  return {
    type: CHANGE_USER_DATA_SUCCESS,
    user: data.user,
  };
}
interface ILogoutAction {
  type: typeof LOGOUT_REQUEST;
}
interface ILogoutFailedAction {
  type: typeof LOGOUT_FAILED;
}
interface ILogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}
function logoutAction(): ILogoutAction {
  return { type: LOGOUT_REQUEST };
}
function logoutSuccessAction(): ILogoutSuccessAction {
  return {
    type: LOGOUT_SUCCESS,
  };
}
function logoutFailedAction(): ILogoutFailedAction {
  return {
    type: LOGOUT_FAILED,
  };
}
export type TProfileActions =
  | IChangeUserDataAction
  | IChangeUserDataFailedAction
  | IChangeUserDataSuccessAction
  | IGetUserDataAction
  | IGetUserDataFailedAction
  | IGetUserDataSuccessAction
  | IChangeUserDataSuccessAction
  | ILogoutAction
  | ILogoutFailedAction
  | ILogoutSuccessAction;

export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserDataAction());
    fetch(`${baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(getUserDataSuccessAction(res));
      })
      .catch((err) => {
        dispatch(getUserDataFailedAction());
        console.log(err);
      });
  };
};

export const changeUserData: AppThunk = (
  newEmail: string,
  newName: string,
  newPassword: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(changeUserDataAction());
    fetch(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        email: newEmail,
        name: newName,
        password: newPassword,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(changeUserDataSuccessAction(res));
      })
      .catch((err) => {
        dispatch(changeUserDataFailedAction());
        console.log(err);
      });
  };
};
export const logout: AppThunk = () => {
  deleteCookie("token");
  return function (dispatch: AppDispatch) {
    dispatch(logoutAction());
    fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(logoutSuccessAction());
      })
      .catch((err) => {
        dispatch(logoutFailedAction());
        console.log(err);
      });
  };
};
export {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
  CHANGE_USER_DATA_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
};
