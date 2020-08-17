import React, { useState, useEffect, useContext, Fragment } from "react";
import JobContext from "../../context/jobs/jobContext";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { makeStyles } from "@material-ui/core/styles";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Button, Typography } from "@material-ui/core/";

import moment from "moment";

const Weeks = ({ props, component, callback }) => {
  const useStyles = makeStyles(() => ({
    btn: {
      margin: "2rem",
    },
  }));

  const classes = useStyles();

  const jobContext = useContext(JobContext);

  const { filterWeek, clearFilter, filtred, getJobsCash } = jobContext;

  let curr = moment();

  let weekN = curr.isoWeek();

  const [period, setPeriod] = useState({});

  const [week, setWeek] = useState(weekN);

  useEffect(() => {
    setWeek(weekN);
    clearFilter();

    if (curr.date() <= 15) {
      setPeriod({
        from: moment().set("date", 1).format(" MMMM DD YYYY"),
        to: moment().set("date", 15).format(" MMMM DD YYYY"),
      });
    } else {
      setPeriod({
        from: moment().set("date", 15).format(" MMMM DD YYYY"),
        to: moment()
          .set("date", curr.endOf("month").date())
          .format(" MMMM DD YYYY"),
      });
    }

    //eslint-disable-next-line
  }, []);

  const weekNumber = (week) => {
    props(week);
  };

  const getPeriod = (period) => {
    callback(period);
  };

  const incrementWeek = (e) => {
    e.preventDefault();
    let response = {};
    let week1 = week + 1;
    let date = moment().isoWeek(week1);

    let date1 = date.startOf("week").format("dddd, MMMM DD YYYY");
    response.date = date1;

    filterWeek(response);
    setWeek(week1);
    weekNumber(week1);
  };
  const decrementWeek = (e) => {
    e.preventDefault();
    let response = {};
    let week1 = week - 1;
    let date = moment().isoWeek(week1);

    let date1 = date.startOf("week").format("YYYY-MM-DD");
    response.date = date1;

    filterWeek(response);

    setWeek(week1);
    weekNumber(week1);
  };

  const incrementPeriod = (e) => {
    e.preventDefault();

    let week1 = week + 1;
    setWeek(week1);

    let periodEnd;
    const periodStart = moment(period.to).add(1, "d");

    if (periodStart.date() <= 15) {
      periodEnd = moment(periodStart).add(14, "d");
    } else {
      periodEnd = moment(periodStart).endOf("month");
    }
    const newPeriod = {
      from: periodStart.format(" MMMM DD YYYY"),
      to: periodEnd.format(" MMMM DD YYYY"),
    };

    setPeriod(newPeriod);

    if (component === "Material") {
      getPeriod(newPeriod);
    } else {
      getJobsCash(newPeriod);
    }
  };

  const decrementPeriod = (e) => {
    e.preventDefault();

    let week1 = week - 1;
    setWeek(week1);

    let periodStart;

    let periodEnd = moment(period.from).subtract(1, "d");

    if (periodEnd.date() >= 16) {
      periodStart = moment(periodEnd).subtract(15, "day");
    } else {
      periodStart = moment(periodEnd).startOf("month");
    }

    const newPeriod = {
      from: periodStart.format(" MMMM DD YYYY"),
      to: periodEnd.format(" MMMM DD YYYY"),
    };

    setPeriod(newPeriod);
    if (component === "Material") {
      getPeriod(newPeriod);
    } else {
      getJobsCash(newPeriod);
    }
  };

  const clearAll = () => {
    setWeek(weekN);
    weekNumber(weekN);
    clearFilter();
  };

  const backToCurentWeek = () => {
    let newPeriod;
    setWeek(weekN);

    if (curr.date() <= 15) {
      newPeriod = {
        from: moment().set("date", 1).format(" MMMM DD YYYY"),
        to: moment().set("date", 15).format(" MMMM DD YYYY"),
      };
    } else {
      newPeriod = {
        from: moment().set("date", 15).format(" MMMM DD YYYY"),
        to: moment()
          .set("date", curr.endOf("month").date())
          .format(" MMMM DD YYYY"),
      };
    }

    setPeriod(newPeriod);
    if (component === "Material") {
      getPeriod(newPeriod);
    } else {
      getJobsCash();
    }
  };

  return (
    <Fragment>
      <Typography component="h3" variant="h6" color="inherit">
        Switch weeks
      </Typography>
      {component === "Cash" || component === "Material" ? (
        <Typography component="h3" variant="h6" color="inherit">
          {period.from} : {period.to}
        </Typography>
      ) : null}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          onClick={
            component === "Cash" || component === "Material"
              ? decrementPeriod
              : decrementWeek
          }
          fullWidth={true}
          startIcon={<ArrowBackIosOutlinedIcon />}
        ></Button>

        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth={true}
          startIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={
            component === "Cash" || component === "Material"
              ? incrementPeriod
              : incrementWeek
          }
        ></Button>
      </div>
      {filtred && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={true}
            startIcon={<BackspaceIcon />}
            onClick={clearAll}
          >
            Get Back To Current Week
          </Button>
        </div>
      )}
      {(component === "Cash" || component === "Material") && week !== weekN ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={true}
            startIcon={<BackspaceIcon />}
            onClick={backToCurentWeek}
          >
            Get Back To Current Week
          </Button>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Weeks;
