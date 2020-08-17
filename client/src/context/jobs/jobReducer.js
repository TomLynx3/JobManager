import {
  GET_JOBS,
  ADD_JOB,
  GET_JOBS_WEEK,
  DELETE_JOB,
  CLEAR_JOBS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOB,
  FILTER_JOB,
  CLEAR_FILTER,
  JOB_ERROR,
  CLEAR_FILTER_ITEM,
  FILTER_WEEK,
  GET_JOBS_CASH,
  DELETE_JOB_CASH,
  ADD_JOB_CASH,
  CLEAR_CASH,
  UPDATE_CASH_JOB,
  GET_UNPAID_JOBS,
  GET_TWO_WEEKS,
  GET_CALENDAR_STATEMENT,
  SEND_FILE,
  UNPAID_UPDATE,
  CLEAR_ALERTS,
  CLEAR_CASH_FILTER_ITEM,
  FILE_SEND_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_JOBS:
    case GET_JOBS_WEEK:
    case GET_TWO_WEEKS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case SEND_FILE:
      return {
        ...state,
        msg: action.payload.msg,
        jobs: action.payload.jobs,
        loading: false,
      };
    case GET_CALENDAR_STATEMENT:
      return {
        ...state,
        calendarStatement: action.payload,
        loading: false,
        loaded: true,
      };
    case GET_UNPAID_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };

    case GET_JOBS_CASH:
      return {
        ...state,
        jobsCash: action.payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload.job],
        loading: false,
        msg: action.payload.msg,
      };
    case ADD_JOB_CASH:
      return {
        ...state,
        jobsCash: [...state.jobsCash, action.payload.jobCash],
        loading: false,
        msg: action.payload.msg,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload._id),
        msg: action.payload.msg,
        loading: false,
      };
    case DELETE_JOB_CASH:
      return {
        ...state,
        jobsCash: state.jobsCash.filter(
          (job) => job._id !== action.payload._id
        ),
        loading: false,
        msg: action.payload.msg,
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
        current: null,
        filtred: null,
        error: null,
      };
    case CLEAR_CASH:
      return {
        ...state,
        jobsCash: [],
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_FILTER_ITEM:
      return {
        ...state,
        filtred: state.jobs.filter((job) => job._id !== action.payload),
        loading: false,
      };
    case CLEAR_CASH_FILTER_ITEM:
      return {
        ...state,
        cashFiltred: state.jobsCash.filter((job) => job._id !== action.payload),
        loading: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.job._id ? action.payload.job : job
        ),
        loading: false,
        msg: action.payload.msg,
      };
    case UPDATE_CASH_JOB:
      return {
        ...state,
        jobsCash: state.jobsCash.map((job) =>
          job._id === action.payload.job._id ? action.payload.job : job
        ),
        loading: false,
        msg: action.payload.msg,
      };
    case UNPAID_UPDATE:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.unpaid === action.payload.job.unpaid ? action.payload.job : job
        ),
        msg: action.payload.msg,
        loading: false,
      };
    case FILTER_JOB:
      return {
        ...state,
        filtred: action.payload.jobFiltred,
        cashFiltred: action.payload.cashFiltred,
        loading: false,
      };
    case FILTER_WEEK:
      return {
        ...state,
        filtred: action.payload,
        loading: false,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtred: null,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FILE_SEND_ERROR:
      return {
        ...state,
        error: action.payload.msg,
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
