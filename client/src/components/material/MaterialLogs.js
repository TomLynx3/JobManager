import React, { useEffect, useContext, Fragment } from "react";
import StatementContext from "../../context/statement/statementContext";
import MaterialItem from "./MaterialItem";
import Loading from "../layout/Loading";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Icon, Typography } from "@material-ui/core/";

const MaterialLogs = ({ period }) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      variant: "outlined",
      height: "40vh",
    },
    text: {
      color: "grey",
    },
  }));

  const classes = useStyles();
  const statementContext = useContext(StatementContext);

  const { material, loading, getMaterial } = statementContext;

  useEffect(() => {
    if (period === undefined) {
      getMaterial();
    } else {
      getMaterial(period);
    }

    //eslint-disable-next-line
  }, [period]);

  const materialRender = () => {
    if (!loading && material.length > 0) {
      return (
        <Grid container direction="row" spacing={4}>
          {material.map((material, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <MaterialItem key={material._id} material={material} />
            </Grid>
          ))}
        </Grid>
      );
    } else if (loading) {
      return (
        <Grid item md={12} xs={12} sm={12}>
          <Loading />
        </Grid>
      );
    } else {
      return (
        <Grid container direction="row" spacing={3}>
          <Grid item md={12} xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Icon>
                <ErrorIcon />
              </Icon>
              <Typography className={classes.text}>
                No Material Logs For Current Period
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  };

  return <Fragment>{materialRender()}</Fragment>;
};

export default MaterialLogs;
