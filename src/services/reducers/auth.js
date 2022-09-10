import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "../actions/register";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/login";
import { RECOVER_PASSWORD_FAILED, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_REQUEST } from "../actions/password-recover";
import { GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS, GET_USER_DATA_REQUEST } from "../actions/profile";
import { setCookie } from "../../utils/utils";

const authInitialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuth: false,
  isFailed: false,
  request: false,
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        request: true,
        isFailed: false,
        user: action.user,
        isAuth: true,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        request: false,
        isFailed: true,
        isAuth: false,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGIN_SUCCESS: {
      setCookie('token', action.token.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken)
      
      return {
        ...state,
        request: true,
        isFailed: false,
        user: action.user,
        isAuth: true,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        request: false,
        isFailed: true,
        isAuth: false,
      };
    }
    case RECOVER_PASSWORD_FAILED: {
        return {
            ...state,
            request: false,
            isFailed:true
        }
    }
    default: {
        return state
    }
  }
};
