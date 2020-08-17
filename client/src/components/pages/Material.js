import React, { useEffect, useContext, useState } from "react";
import Weeks from "../reports/Weeks";
import ReportStatement from "../reports/ReportStatement";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import StatementContext from "../../context/statement/statementContext";
import MaterialForm from "../material/MaterialForm";
import { makeStyles } from "@material-ui/core/styles";
import MaterialLogs from "../material/MaterialLogs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Grid, Modal, Backdrop, Fade, Button } from "@material-ui/core/";

const Material = () => {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    modalContent: {
      outline: "none",
    },
  }));

  const [open, setOpen] = useState(false);

  const [period, setPeriod] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const statementContext = useContext(StatementContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { msg, error, clearAlerts } = statementContext;

  useEffect(() => {
    authContext.loadUser();
    if (msg && msg.length > 0) {
      setAlert(msg, "success");
      clearAlerts();
    }
    if (error && error.length > 0) {
      setAlert(error, "error");
      clearAlerts();
    }
  }, [msg, error]);

  const getPeriod = (period) => {
    if (period !== undefined) {
      setPeriod(period);
    }
  };

  return (
    <Grid container direction="row" spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <Weeks component={"Material"} callback={getPeriod}></Weeks>
        <ReportStatement component={"Material"} period={period} />
        <Grid item md={12} xs={12} sm={12}>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            fullWidth={true}
          >
            Add Material
          </Button>
        </Grid>
      </Grid>
      <MaterialLogs period={period} />
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalContent}>
            <MaterialForm handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Material;
