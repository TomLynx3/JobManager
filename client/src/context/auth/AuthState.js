import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  CLEAN_SIGNUP_SUCCESS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    msg: [],
    verSuccess: null,
    role: null,
    signUpSuccess: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Email Verification redirect to login page

  const emailVer = async (token) => {
    try {
      const res = await axios.get(`/api/users/${token.token}`);

      dispatch({ type: VERIFICATION_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: VERIFICATION_FAIL, payload: err.response.data.msg });
    }
  };
  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
    }
  };
  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  //Clean SignUp Success

  const cleanSignUpSuccess = () => dispatch({ type: CLEAN_SIGNUP_SUCCESS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loaded: state.loaded,
        role: state.role,
        msg: state.msg,
        signUpSuccess: state.signUpSuccess,
        verSuccess: state.verSuccess,
        register,
        clearErrors,
        loadUser,
        login,
        emailVer,
        logout,
        cleanSignUpSuccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
