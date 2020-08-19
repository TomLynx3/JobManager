import React, { useReducer } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import StatementContext from "./statementContext";
import statementReducer from "./statementReducer";
import {
  LOG_ERROR,
  CLEAR_FILTER,
  GET_CASH_BALANCE,
  ADD_CASH_LOG,
  GET_CASH_LOGS,
  CLEAR_LOGS,
  DELETE_CASH_LOG,
  ADD_MATERIAL,
  GET_MATERIAL,
  DELETE_MATERIAL,
} from "../types";

const StatementState = (props) => {
  const initialState = {
    statement: 0,
    cashBalance: [],
    cashLogs: [],
    msg: [],
    material: [],
  };

  const [state, dispatch] = useReducer(statementReducer, initialState);

  // Get cash logs
  const getCashLogs = async () => {
    try {
      const res = await axios.get("/api/statement/cash/logs");

      dispatch({ type: GET_CASH_LOGS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Get Cash balance
  const getCashBalance = async () => {
    try {
      const res = await axios.get("/api/statement/cash");
      dispatch({ type: GET_CASH_BALANCE, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  // delete cash log

  const deleteCashLog = async (_id) => {
    try {
      const res = await axios.delete(`/api/statement/cash/logs/${_id}`);

      dispatch({ type: DELETE_CASH_LOG, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  // Add cash Log

  const addCashLog = async (log) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/statement/cash", log, config);

      dispatch({ type: ADD_CASH_LOG, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Add Material

  const addMaterial = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/statement/material", data, config);

      dispatch({ type: ADD_MATERIAL, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  // Get Material items for concrete period

  const getMaterial = async (date) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/statement/getmaterial", date, config);

      dispatch({ type: GET_MATERIAL, payload: res.data });
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  //Delete Material item

  const deleteMaterial = async (_id) => {
    try {
      const res = await axios.delete(`/api/statement/material/${_id}`);

      dispatch({ type: DELETE_MATERIAL, payload: res.data });
      NotificationManager.success(res.data.msg, "Success!", 2500);
    } catch (err) {
      dispatch({ type: LOG_ERROR });
      NotificationManager.error(err.response.data.error, "Error!", 2500);
    }
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //Clear logs
  const clearLogs = () => {
    dispatch({ type: CLEAR_LOGS });
  };

  return (
    <div>
      <StatementContext.Provider
        value={{
          logs: state.logs,
          logFiltred: state.logFiltred,
          statement: state.statement,
          cashBalance: state.cashBalance,
          cashLogs: state.cashLogs,
          msg: state.msg,
          material: state.material,
          addCashLog,
          getCashLogs,
          deleteCashLog,
          clearLogs,
          clearFilter,
          getCashBalance,
          addMaterial,
          getMaterial,
          deleteMaterial,
        }}
      >
        {props.children}
      </StatementContext.Provider>
    </div>
  );
};

export default StatementState;
