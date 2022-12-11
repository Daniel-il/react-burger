import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";
const RECOVER_PASSWORD_REQUEST: "RECOVER_PASSWORD_REQUEST" =
  "RECOVER_PASSWORD_REQUEST";
const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS";
const RECOVER_PASSWORD_FAILED = "RECOVER_PASSWORD_FAILED";

interface IRecoverPasswordAction {
  type: typeof RECOVER_PASSWORD_REQUEST;
}
interface IRecoverPasswordSuccessAction {
  type: typeof RECOVER_PASSWORD_SUCCESS;
}
interface IRecoverPasswordFailedAction {
  type: typeof RECOVER_PASSWORD_FAILED;
}
function recoverPasswordAction(): IRecoverPasswordAction {
  return { type: RECOVER_PASSWORD_REQUEST };
}
function recoverPasswordSuccessAction(): IRecoverPasswordSuccessAction {
  return {
    type: RECOVER_PASSWORD_SUCCESS
  }
}
function recoverPasswordFailedAction(): IRecoverPasswordFailedAction {
  return {
    type: RECOVER_PASSWORD_FAILED
  }
}
export type TRecoverPasswordActions =
  | IRecoverPasswordAction
  | IRecoverPasswordSuccessAction
  | IRecoverPasswordFailedAction;
export const recoverPassword: AppThunk = (email: string) =>{
  return function (dispatch: AppDispatch) {
    dispatch(recoverPasswordAction());

    fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(checkResponse)
      .then((res) =>
        dispatch(recoverPasswordSuccessAction())
      )
      .catch((err) => {
        dispatch(recoverPasswordFailedAction());
        console.log(err);
      });
  };
}

export {
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_REQUEST,
};
