import React, { useContext, useEffect, Fragment, useState } from "react";

import BreakdownItem from "../jobs/BreakdownItem";
import AuthContext from "../../context/auth/authContext";
import JobContext from "../../context/jobs/jobContext";
import FilterWeek from "../jobs/FilterWeek";
import moment from "moment";

const Breakdown = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);
  const { jobs, getJobsWeek, filtred } = jobContext;
  useEffect(() => {
    authContext.loadUser();
    getJobsWeek();
    setDate(days);

    //eslint-disable-next-line
  }, []);
  let curr = moment();
  let days = [];
  let from_date = curr.startOf("week");

  for (let i = 1; i <= 7; i++) {
    days.push(
      moment(from_date + 1)
        .add(i, "days")
        .format("dddd, MMMM DD YYYY")
    );
  }

  const [date, setDate] = useState(days);

  //Callback function to get date from FilterWeek search input

  const getDate = (date) => {
    let days = [];
    let curr = moment(date.date);
    let from_date = curr.startOf("week");

    for (let i = 1; i <= 7; i++) {
      days.push(
        moment(from_date + 1)
          .add(i, "days")
          .format("dddd, MMMM DD YYYY")
      );
    }

    setDate(days);
  };

  return (
    <Fragment>
      <FilterWeek props={getDate}></FilterWeek>
      <div className="grid-container">
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {filtred !== null
              ? filtred
                  .filter(function (job) {
                    return job.date === date[0];
                  })
                  .reduce(function (acc, obj) {
                    return acc + obj.total_earned;
                  }, 0)
                  .toFixed(2)
              : jobs
                  .filter(function (job) {
                    return job.date === date[0];
                  })
                  .reduce(function (acc, obj) {
                    return acc + obj.total_earned;
                  }, 0)
                  .toFixed(2)}
            $
          </h3>

          {<h5>{date[0]}</h5>}

          {filtred !== null
            ? filtred
                .filter(function (job) {
                  return job.date === date[0];
                })
                .map((jobs) => <BreakdownItem key={jobs._id} jobs={jobs} />)
            : jobs
                .filter(function (job) {
                  return job.date === date[0];
                })
                .map((jobs) => <BreakdownItem key={jobs._id} jobs={jobs} />)}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[1];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>

          {<h5>{date[1]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[1];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[2];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>
          {<h5>{date[2]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[2];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[3];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>
          {<h5>{date[3]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[3];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[4];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>
          {<h5>{date[4]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[4];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[5];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>
          {<h5>{date[5]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[5];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
        <div className="grid-item">
          <h3 style={{ color: "red" }}>
            Total per Day: {""}
            {jobs
              .filter(function (job) {
                return job.date === date[6];
              })
              .reduce(function (acc, obj) {
                return acc + obj.total_earned;
              }, 0)
              .toFixed(2)}
            $
          </h3>
          {<h5>{date[6]}</h5>}
          {jobs
            .filter(function (job) {
              return job.date === date[6];
            })
            .map((jobs) => (
              <BreakdownItem key={jobs._id} jobs={jobs} />
            ))}
        </div>
      </div>
      <h3 style={{ color: "red" }}>
        Total per Week: {""}
        {jobs
          .reduce(function (acc, obj) {
            return acc + obj.total_earned;
          }, 0)
          .toFixed(2)}
        $
      </h3>
    </Fragment>
  );
};
export default Breakdown;
