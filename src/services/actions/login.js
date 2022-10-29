import { baseUrl } from "../../utils/constants";
import { checkResponse, setCookie } from "../../utils/utils";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
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
    })
})
        .then(checkResponse)
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
            token: res.accessToken,
            refreshToken: res.refreshToken,
          });
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_FAILED,
          });
          console.log(err);
        })
  };
}

export { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED };
