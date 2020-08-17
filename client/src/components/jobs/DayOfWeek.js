import React, { useEffect, useState, Fragment, useContext } from "react";
import JobItem from "./JobItem";
import JobContext from "../../context/jobs/jobContext";
import moment from "moment";

const DayOfWeek = ({ jobs }) => {
  const jobContext = useContext(JobContext);
  const { filtred } = jobContext;
  const [today, setDate] = useState();

  useEffect(() => {
    setDate(moment().format("dddd, MMMM DD YYYY"));
  }, []);

  return (
    <Fragment>
      {filtred !== null
        ? filtred.map((jobs) => <JobItem key={jobs._id} jobs={jobs} />)
        : jobs
            .filter(function (job) {
              return job.date === today;
            })
            .map((jobs) => <JobItem key={jobs._id} jobs={jobs} />)}
    </Fragment>
  );
};

export default DayOfWeek;
