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
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        loaded: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        signUpSuccess: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        loaded: true,
        msg: action.payload.msg,
      };
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        verSuccess: true,
        isAuthenticated: true,
        msg: action.payload,
        loading: false,
        error: action.payload.msg,
      };
    case VERIFICATION_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        hasPermissions: null,
        loaded: true,
        role: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        hasPermissions: null,
        loaded: true,
        role: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        msg: [],
      };

    default:
      return state;
  }
};
