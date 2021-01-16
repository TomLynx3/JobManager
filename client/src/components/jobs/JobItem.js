import React, { useContext, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MessageIcon from "@material-ui/icons/Message";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import ReceiptIcon from "@material-ui/icons/Receipt";
import EditIcon from "@material-ui/icons/Edit";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import JobContext from "../../context/jobs/jobContext";
import PersonIcon from "@material-ui/icons/Person";
import JobForm from "./JobForm";
import BusinessIcon from "@material-ui/icons/Business";
import CashForm from "../cash/CashForm1";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  GridList,
  GridListTile,
  Chip,
  Avatar,
  Grid,
  Tooltip,
  Button,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

const JobItem = ({ jobs, callback, component, close ,test}) => {
  const useStyles = makeStyles(() => ({
    root: {
      minWidth: 275,

      background: "#E4E3E5",
      marginBottom: "1rem",
      margin: "1rem",
    },
    avatar: {
      marginRight: "1rem",
    },
    buttons: {
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    green: {
      color: "#005A34",
    },
    viewBtn: {
      width: "100%",
    },
    gridList: {
      width: "100%",
    },
    gridtListTile: {
      textAlign: "center",
    },
    icon: {
      textAlign: "center",
    },
    btnBlue: {
      background: "#008996",
    },
    btnRed: {
      background: "#574142",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    modalContent: {
      outline: "none",
    },
  }));

  const classes = useStyles();

  const jobContext = useContext(JobContext);

  const {
    deleteJob,
    setCurrent,
    clearCurrent,
    filtred,
    clearFilterItem,
    updateUnpaid,
    clearCashFilterItem,
    cashFiltred,
    deleteJobCash,
  } = jobContext;

  const [toogle, setToogle] = useState(true);

  const [open, setOpen] = useState(false);

  const [openForm, setForm] = useState(false);

  const [openUnpaid, setUnpaid] = useState(false);



  const handleOpenUnpaid = () => {
    setUnpaid(true);
  };
  const handleCloseUnpaid = () => {
    setUnpaid(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    if (toogle === false) {
      setToogle(true);
    } else {
      setToogle(false);
    }
  };
  const {
    _id,
    date,
    company,
    address,
    amount,
    material,
    description,
    taxes,
    total_earned,
    worker,
    invoice,
    unpaid,
    type,
  } = jobs;

  const onDelete = () => {
    deleteJob(_id);
    clearCurrent();
    if (filtred) {
      clearFilterItem(_id);
    }
  };

  const delteJobCash = () => {
    deleteJobCash(_id);
    clearCurrent();
    if (cashFiltred) {
      clearCashFilterItem(_id);
    }
  };

  const handleOpenForm = () => {
    setForm(true);

    setCurrent(jobs);
  };
  const handleCloseForm = () => {
    setForm(false);
  };
  const editPaid = () => {
    updateUnpaid(_id);
    setUnpaid(false);
    close();
   
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <GridList
          cols={type === "Excavation" ? 4 : 3}
          spacing={1}
          cellHeight={40}
          className={classes.gridList}
        >
          {component === "Cash" ? null : (
            <GridListTile className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label={company}
                color={company === "Express" ? "secondary" : "primary"}
              ></Chip>
            </GridListTile>
          )}

          {component === "Cash" ? null : (
            <GridListTile className={classes.gridtListTile}>
              <Chip
                avatar={
                  <Avatar>
                    <PersonIcon></PersonIcon>
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label={worker}
                color="default"
              ></Chip>
            </GridListTile>
          )}
          {component === "Cash" ? (
            <GridListTile className={classes.gridtListTile}>
              <Chip
                className={classes.green}
                avatar={
                  <Avatar>
                    <AttachMoneyIcon
                      className={classes.green}
                    ></AttachMoneyIcon>
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label="Cash"
                color="default"
              ></Chip>
            </GridListTile>
          ) : (
            <GridListTile className={classes.gridtListTile}>
              {unpaid === true ? (
                <Chip
                  avatar={
                    <Avatar>
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </Avatar>
                  }
                  variant="outlined"
                  size="small"
                  label="Unpaid"
                  color="secondary"
                ></Chip>
              ) : (
                <Chip
                  avatar={
                    <Avatar>
                      <AttachMoneyIcon></AttachMoneyIcon>
                    </Avatar>
                  }
                  variant="outlined"
                  size="small"
                  label="Paid"
                  color="primary"
                ></Chip>
              )}
            </GridListTile>
          )}
          {component === "Cash" || type === "Service" ? null : (
            <GridListTile>
              <Chip
                avatar={
                  <Avatar>
                    <BuildIcon />
                  </Avatar>
                }
                variant="outlined"
                size="small"
                label={type}
                color="secondary"
              ></Chip>
            </GridListTile>
          )}
        </GridList>
        <Grid
          className={classes.buttons}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {callback ? (
            <Chip
              className={classes.chip}
              avatar={
                <Avatar>
                  {jobs.unpaid ? (
                    <RadioButtonUncheckedIcon />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )}
                </Avatar>
              }
              variant="outlined"
              size="small"
              label={jobs.unpaid ? "Unpaid" : "Paid"}
              clickable={true}
              disabled={jobs.unpaid ? false : true}
              onClick={handleOpenUnpaid}
            ></Chip>
          ) : (
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                className={classes.btnBlue}
                onClick={handleOpenForm}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              className={classes.btnRed}
              onClick={handleClickOpen}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete the job?"}
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={component === "Cash" ? delteJobCash : onDelete}
                color="primary"
              >
                Yes
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUnpaid}
            onClose={handleCloseUnpaid}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Is this job paid in full?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={editPaid} color="primary">
                Yes
              </Button>
              <Button onClick={handleCloseUnpaid} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <List>
          {component === "Cash" ? null : (
            <ListItem>
              <Avatar className={classes.avatar}>
                <ReceiptIcon />
              </Avatar>
              <Typography>Invoice: {invoice}</Typography>
            </ListItem>
          )}

          <ListItem>
            <Avatar className={classes.avatar}>
              <CalendarTodayIcon />
            </Avatar>
            <Typography>Date: {date}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <HomeIcon />
            </Avatar>
            <Typography>Address: {address}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon color="secondary" />
            </Avatar>
            <Typography>
              Total Amount: {amount}
              {"$"}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.green} />
            </Avatar>
            <Typography>
              Earned: {total_earned}
              {"$"}
            </Typography>
          </ListItem>

          <Button
            className={classes.viewBtn}
            size="large"
            startIcon={toogle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            onClick={onClick}
          >
            {toogle ? "View More" : "View Less"}
          </Button>

          {!toogle && (
            <Fragment>
              {" "}
              <ListItem>
                <Avatar className={classes.avatar}>
                  <AttachMoneyIcon color="secondary" />
                </Avatar>
                <Typography>
                  Material: {material}
                  {"$"}
                </Typography>
              </ListItem>
              {component === "Cash" ? null : (
                <ListItem>
                  <Avatar className={classes.avatar}>
                    <AccountBalanceIcon />
                  </Avatar>
                  <Typography>
                    HST: {taxes}
                    {"$"}
                  </Typography>
                </ListItem>
              )}
              <ListItem>
                <Avatar className={classes.avatar}>
                  <MessageIcon />
                </Avatar>
                <Typography>Description: {description}</Typography>
              </ListItem>
            </Fragment>
          )}
        </List>
      </CardContent>
      <Modal
        className={classes.modal}
        open={openForm}
        onClose={handleCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openForm}>
          <div className={classes.modalContent}>
            {component === "Cash" ? (
              <CashForm component={"Modal"} handleCloseForm={handleCloseForm} />
            ) : (
              <JobForm
                component={"Modal"}
                handleCloseForm={handleCloseForm}
              ></JobForm>
            )}
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

export default JobItem;
