import React, { useEffect, useContext, Fragment } from "react";
import StatementContext from "../../context/statement/statementContext";
import JobContext from "../../context/jobs/jobContext";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loading from "../layout/Loading";

const Statement = () => {
  const statementContext = useContext(StatementContext);
  const jobContext = useContext(JobContext);
  const { getCashBalance, cashBalance, cashLogs } = statementContext;

  const { jobsCash } = jobContext;

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    trackPromise(getCashBalance());

    //eslint-disable-next-line
  }, [jobsCash, cashLogs]);

  return (
    <Fragment>
      {!promiseInProgress ? (
        <h2>
          Outstanding cash balance :{" "}
          <p style={{ color: "red" }}>{cashBalance} $</p>
        </h2>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Statement;
