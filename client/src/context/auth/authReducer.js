import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  CLEAN_SIGNUP_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        signUpSuccess: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loaded: true,
        msg: action.payload.msg,
        loading: false,
      };
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        verSuccess: true,
        msg: action.payload.msg,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        hasPermissions: null,
        loaded: true,
        role: null,
        loading: false,
      };
    case VERIFICATION_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        hasPermissions: null,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        hasPermissions: null,
        loaded: true,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
      };
    case CLEAN_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: false,
      };
    default:
      return state;
  }
};
