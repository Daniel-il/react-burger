import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
const RECOVER_PASSWORD_REQUEST = "RECOVER_PASSWORD";
const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS";
const RECOVER_PASSWORD_FAILED = "RECOVER_PASSWORD_FAILED";

export function recoverPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RECOVER_PASSWORD_REQUEST,
    });

    fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then(checkResponse)
    .then(res => dispatch({
      type: RECOVER_PASSWORD_SUCCESS,
    }))
    .catch((err) => {
        dispatch({
          type: RECOVER_PASSWORD_FAILED,
        });
        console.log(err);
      });
  }
}

export {RECOVER_PASSWORD_FAILED, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_REQUEST}