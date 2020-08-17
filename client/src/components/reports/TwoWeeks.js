import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";

const TwoWeeks = () => {
  const [period, setPeriod] = useState({});

  const date = moment().date();

  const curr = moment();
  const end_date = curr.endOf("month").date();

  useEffect(() => {
    if (date <= 15) {
      setPeriod({
        from: moment()
          .set("date", 1)
          .format(" MMMM DD YYYY"),
        to: moment()
          .set("date", 15)
          .format(" MMMM DD YYYY")
      });
    } else {
      setPeriod({
        from: moment()
          .set("date", 15)
          .format(" MMMM DD YYYY"),
        to: moment()
          .set("date", end_date)
          .format(" MMMM DD YYYY")
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h2>
        Current Period : <br></br> {period.from} - {period.to}
      </h2>
    </Fragment>
  );
};

export default TwoWeeks;
