import React, { useEffect, Fragment } from "react";
import JobItem from "./JobItem";

const DayOfWeek = ({ jobs }) => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      {jobs.map((jobs) => (
        <JobItem key={jobs._id} jobs={jobs} />
      ))}
    </Fragment>
  );
};

export default DayOfWeek;
