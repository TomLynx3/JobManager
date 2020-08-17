import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";

const Today = () => {
  const useStyles = makeStyles(() => ({
    root: {
      fontWeight: "bold",
      marginBottom: "1rem",
    },
  }));

  const classes = useStyles();

  const [today, setDate] = useState();

  useEffect(() => {
    setDate(moment().format("dddd, MMMM DD YYYY"));
  }, []);

  return (
    <Typography className={classes.root} variant="h6" align="center">
      Today is: {today}
    </Typography>
  );
};

export default Today;
