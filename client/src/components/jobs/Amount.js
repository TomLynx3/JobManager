import React, { useContext, Fragment } from "react";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import JobContext from "../../context/jobs/jobContext";

const Amount = ({ amount }) => {
  const jobContext = useContext(JobContext);

  const useStyles = makeStyles(() => ({
    wrapIcon: {
      verticalAlign: "middle",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "red",
    },
  }));

  const classes = useStyles();

  const { filtred } = jobContext;

  return (
    <div>
      {!filtred && (
        <Fragment>
          <Typography
            component="h3"
            variant="h6"
            color="inherit"
            className={classes.wrapIcon}
          >
            Total per Day: {amount}
            <Icon className="fas fa-dollar-sign" />
          </Typography>
        </Fragment>
      )}
    </div>
  );
};

export default Amount;
