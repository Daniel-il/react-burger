import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types";

const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

interface IResetPasswordAction {
  type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailedAction {
  type: typeof RESET_PASSWORD_FAILED;
}
function resetPasswordFailedAction(): IResetPasswordFailedAction {
  return { type: RESET_PASSWORD_FAILED };
}
function resetPasswordAction(): IResetPasswordAction {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
}
function resetPasswordSuccessAction(): IResetPasswordSuccessAction {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}
export type TResetPasswordActions =
  | IResetPasswordAction
  | IResetPasswordFailedAction
  | IResetPasswordSuccessAction;

export const resetPassword: AppThunk = (
  password: string,
  emailToken: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordAction());
    fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: emailToken,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(resetPasswordSuccessAction());
      })
      .catch((err) => {
        dispatch(resetPasswordFailedAction());
        console.log(err);
      });
  };
};

export {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
};
