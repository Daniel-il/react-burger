import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  TRegistrationActions,
} from "../actions/register";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  TLoginActions,
} from "../actions/login";
import {
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_REQUEST,
  TRecoverPasswordActions,
} from "../actions/password-recover";
import {
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_REQUEST,
  TProfileActions,
} from "../actions/profile";
import {
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from "../actions/profile";
import { setCookie, deleteCookie } from "../../utils/utils";
import { TResetPasswordActions } from "../actions/password-reset";
import { TUserData } from "../types/utils";
type TAuthState = {
  user: TUserData | null;
  token: string | null;
  refreshToken: string | null;
  isAuth: boolean;
  isFailed: boolean;
  request: boolean;
};
const authInitialState: TAuthState= {
  user: null,
  token: null,
  refreshToken: null,
  isAuth: false,
  isFailed: false,
  request: false,
};
export type TAuthActions =
  | TLoginActions
  | TRecoverPasswordActions
  | TResetPasswordActions
  | TRegistrationActions
  | TProfileActions;

export const authReducer = (
  state = authInitialState,
  action: TAuthActions
): TAuthState => {
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
      setCookie("token", action.token.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", action.refreshToken);
      console.log(localStorage.getItem("refreshToken"));
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
        isFailed: true,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        request: true,
        isFailed: false,
        user: action.user,
        isAuth: true,
      };
    }
    case GET_USER_DATA_FAILED: {
      deleteCookie("token");
      return {
        ...state,
        request: false,
        isFailed: true,
      };
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        request: true,
        isFailed: false,
      };
    }
    case CHANGE_USER_DATA_REQUEST: {
      return {
        ...state,
        request: true,
        isFailed: false,
      };
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return {
        ...state,
        request: true,
        isFailed: false,
        user: action.user,
      };
    }
    case CHANGE_USER_DATA_FAILED: {
      return {
        ...state,
        request: false,
        isFailed: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
        isFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        request: true,
        isFailed: false,
        user: null,
        isAuth: false,
        token: null,
        refreshToken: null,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        request: false,
        isFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
