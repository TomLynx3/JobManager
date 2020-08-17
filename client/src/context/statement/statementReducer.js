import {
  GET_STATEMENT,
  LOG_ERROR,
  CLEAR_FILTER,
  GET_CASH_BALANCE,
  GET_CASH_LOGS,
  ADD_CASH_LOG,
  DELETE_CASH_LOG,
  ADD_MATERIAL,
  CLEAR_ALERTS,
  GET_MATERIAL,
  DELETE_MATERIAL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_STATEMENT:
      return {
        ...state,
        statement: action.payload,
        loading: false,
      };
    case GET_CASH_BALANCE:
      return {
        ...state,
        cashBalance: action.payload,
        loading: false,
      };
    case ADD_CASH_LOG:
      return {
        ...state,
        cashLogs: [...state.cashLogs, action.payload.log],
        msg: [...state.msg, action.payload.msg],
        loading: false,
      };
    case ADD_MATERIAL:
      return {
        ...state,
        material: [...state.material, action.payload.material],
        msg: [...state.msg, action.payload.msg],
        loading: false,
      };
    case GET_MATERIAL:
      return {
        ...state,
        material: action.payload,
        loading: false,
      };
    case DELETE_MATERIAL:
      return {
        ...state,
        material: state.material.filter(
          (item) => item._id !== action.payload._id
        ),
        loading: false,
        msg: action.payload.msg,
      };
    case GET_CASH_LOGS:
      return {
        ...state,
        cashLogs: action.payload,
        loading: false,
      };
    case DELETE_CASH_LOG:
      return {
        ...state,
        cashLogs: state.cashLogs.filter(
          (log) => log._id !== action.payload._id
        ),
        loading: false,
        msg: action.payload.msg,
      };
    case LOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        logFiltred: null,
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        msg: [],
        error: [],
      };

    default:
      return state;
  }
};
