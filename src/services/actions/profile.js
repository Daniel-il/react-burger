import { baseUrl } from "../../utils/constants";
import { getCookie, checkResponse, deleteCookie } from "../../utils/utils";
const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";
const CHANGE_USER_DATA_REQUEST = "CHANGE_USER_DATA_REQUEST";
const CHANGE_USER_DATA_SUCCESS = "CHANGE_USER_DATA_SUCCESS";
const CHANGE_USER_DATA_FAILED = "CHANGE_USER_DATA_FAILED";
const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAILED = "LOGOUT_FAILED";

export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    fetch(`${baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_DATA_FAILED,
        });
        console.log(err);
      });
  };
}

export function changeUserData(newEmail, newName, newPassword) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_USER_DATA_REQUEST,
    });
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
        dispatch({
          type: CHANGE_USER_DATA_SUCCESS,
          user: res.user
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILED,
        });
        console.log(err);
      });
  };
}
export function logout() {
  deleteCookie('token')
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    fetch(`${baseUrl}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": localStorage.getItem('refreshToken')
      })
    }
  )
  .then(checkResponse)
  .then((res) => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  })
  .catch((err) => {
    dispatch({
      type: LOGOUT_FAILED,
    });
    console.log(err);
  });
  }
}
export {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
  CHANGE_USER_DATA_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST
};
