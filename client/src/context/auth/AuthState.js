import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import setAuthToken from "../../utils/setAuthToken";

import { NotificationManager } from "react-notifications";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  CLEAN_SIGNUP_SUCCESS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    error: null,
    msg: [],
    verSuccess: null,
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
      NotificationManager.error(err.response.data.error, "Error!", 2500);
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
      NotificationManager.success(res.data.msg, "Successful!", 2500);
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Email Verification redirect to login page

  const emailVer = async (token) => {
    try {
      const res = await axios.get(`/api/users/${token.token}`);

      dispatch({ type: VERIFICATION_SUCCESS, payload: res.data });
      NotificationManager.success(res.data.msg, "Successful!", 2500);
    } catch (err) {
      dispatch({ type: VERIFICATION_FAIL });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
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
      NotificationManager.success(res.data.msg, "Successful!", 2500);
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };
  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clean SignUp Success

  const cleanSignUpSuccess = () => dispatch({ type: CLEAN_SIGNUP_SUCCESS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        msg: state.msg,
        signUpSuccess: state.signUpSuccess,
        verSuccess: state.verSuccess,
        register,
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
