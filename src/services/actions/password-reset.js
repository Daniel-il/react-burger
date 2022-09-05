import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

const RESET_PASSWORD_REQUEST = "RESET_PASSWORD";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export function resetPassword(password, emailToken) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: password,
        token: emailToken,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err);
      });
  };
}

export {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
};
