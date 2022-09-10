import { baseUrl } from "../../utils/constants";
import { getCookie, checkResponse } from "../../utils/utils";
const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";

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
          user: res.user
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

export {GET_USER_DATA_REQUEST, GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS}