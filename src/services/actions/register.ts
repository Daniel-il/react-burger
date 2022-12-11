import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
import { TUserData } from "../types/utils";

const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = "REGISTRATION_REQUEST";
const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = "REGISTRATION_SUCCESS";
const REGISTRATION_FAILED: 'REGISTRATION_FAILED'= "REGISTRATION_FAILED";
 interface IRegistrationAction {
  type: typeof REGISTRATION_REQUEST
 }
interface IRegistrationFailedAction {
  type: typeof REGISTRATION_FAILED
}
interface IRegistrationSuccessAction {
  type: typeof REGISTRATION_SUCCESS;
  user: TUserData | null,
  token: string,
  refreshToken: string,
}
function registrationAction(): IRegistrationAction {
  return {
    type: REGISTRATION_REQUEST
  }
}
function registrationSuccessAction(data: {
  accessToken: string;
  success: boolean,
  user: TUserData | null,
  refreshToken: string,
}): IRegistrationSuccessAction {
  return {
    type: REGISTRATION_SUCCESS,
    token: data.accessToken,
    user: data.user,
    refreshToken: data.refreshToken
  }
}
function registrationFailedAction(): IRegistrationFailedAction {
  return {
    type: REGISTRATION_FAILED,
  }
}
export type TRegistrationActions = IRegistrationAction | IRegistrationFailedAction | IRegistrationSuccessAction;

export const register:AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(registrationAction());
    fetch(`${baseUrl}/auth/register`, {
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
        name: name,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(registrationSuccessAction(res));
      })
      .catch((err) => {
        dispatch(registrationFailedAction());
        console.log(err);
      });
  };
};

export { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILED };
