import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const register = (email, password, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
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
        dispatch({
          type: REGISTRATION_SUCCESS,
          user: res.user,
          token: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
        console.log(err);
      });
  };
};

export { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILED };
