import React, { useEffect, useContext, Fragment } from "react";
import StatementContext from "../../context/statement/statementContext";
import JobContext from "../../context/jobs/jobContext";
import Loading from "../layout/Loading";

const Statement = () => {
  const statementContext = useContext(StatementContext);
  const jobContext = useContext(JobContext);
  const { getCashBalance, cashBalance, loading, cashLogs } = statementContext;

  const { jobsCash } = jobContext;

  useEffect(() => {
    getCashBalance();

    //eslint-disable-next-line
  }, [jobsCash, cashLogs]);

  return (
    <Fragment>
      {!loading ? (
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
