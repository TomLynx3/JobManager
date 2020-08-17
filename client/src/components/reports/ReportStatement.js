import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Chip } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Loading from "../layout/Loading";
import StatementContext from "../../context/statement/statementContext";
import JobContext from "../../context/jobs/jobContext";

const CalendarStatement = ({ component, period }) => {
  const jobContext = useContext(JobContext);
  const statementContext = useContext(StatementContext);
  const { getCalendarStatement, calendarStatement, loading, jobs } = jobContext;
  const { material } = statementContext;
  useEffect(() => {
    if (period === undefined) {
      getCalendarStatement();
    } else {
      getCalendarStatement(period);
    }

    //eslint-disable-next-line
  }, [jobs, material]);

  const useStyles = makeStyles(() => ({
    paper: {
      backgroundColor: "#e0e0e0",
    },
    gridtListTile: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    text: {
      fontWeight: "bold",
    },
    chip: {
      color: "green",
      border: "1px solid green",
    },
  }));

  const classes = useStyles();

  return (
    <Grid>
      {!loading && calendarStatement !== null ? (
        <Grid container spacing={3} className={classes.gridList}>
          {component === "Material" ? (
            <Grid item xs={6} md={6} lg={6} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`Material Total: ${calendarStatement.totalMaterial} $ `}
              ></Chip>
            </Grid>
          ) : (
            <Grid item xs={6} md={4} lg={4} className={classes.gridtListTile}>
              <Chip
                className={classes.chip}
                avatar={
                  <Avatar>
                    <AttachMoneyIcon className={classes.chip} />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label={`Raw Earned: ${calendarStatement.periodSum} $ `}
              ></Chip>
            </Grid>
          )}
          {component === "Material" ? (
            <Grid item xs={6} md={6} lg={4} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`Gas: ${calendarStatement.gas} $ `}
              ></Chip>
            </Grid>
          ) : (
            <Grid item xs={6} md={4} lg={4} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`Unpaid Total: ${calendarStatement.unpaidSum} $ `}
              ></Chip>
            </Grid>
          )}

          {component === "Material" ? (
            <Grid item xs={6} md={6} lg={6} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`Material: ${calendarStatement.material} $ `}
              ></Chip>
            </Grid>
          ) : (
            <Grid item xs={6} md={4} lg={4} className={classes.gridtListTile}>
              <Chip
                className={classes.chip}
                avatar={
                  <Avatar>
                    <AttachMoneyIcon className={classes.chip} />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label={`Cash: ${calendarStatement.cash} $ `}
              ></Chip>
            </Grid>
          )}
          {component === "Material" ? null : (
            <Grid item xs={6} md={4} lg={4} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`HST: ${calendarStatement.taxes} $ `}
              ></Chip>
            </Grid>
          )}
          {component === "Material" ? null : (
            <Grid item xs={6} md={4} lg={4} className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                color="secondary"
                label={`Material: ${calendarStatement.material} $ `}
              ></Chip>
            </Grid>
          )}

          <Grid
            item
            xs={6}
            md={component === "Material" ? 6 : 4}
            lg={component === "Material" ? 6 : 4}
            className={classes.gridtListTile}
          >
            <Chip
              className={classes.chip}
              avatar={
                <Avatar>
                  <AttachMoneyIcon className={classes.chip} />
                </Avatar>
              }
              variant="outlined"
              size="small"
              label={`Earned: ${calendarStatement.earned} $ `}
            ></Chip>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default CalendarStatement;
