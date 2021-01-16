import React, { useState ,useEffect} from "react";
import clsx from "clsx";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import HomeIcon from "@material-ui/icons/Home";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Chip,
  Avatar,
  Typography,
  ListItem,
  List,
  Modal,
} from "@material-ui/core";

import JobItem from "../jobs/JobItem";
import { red } from "@material-ui/core/colors";

const ReportItem = ({ jobs , test}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    text: {
      marginLeft: "10px",
    },
    cardUnpaid: {
      background: "#E1186A",
      color: "#2F4858",
    },
    cardPaid: {
      background: "#4ACD46",
    },
    chip: {
      margin: "1rem",
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

  return (
    <Grid item xs={12} md={4} sm={6} >
      <Card
        className={clsx(jobs.unpaid ? classes.cardUnpaid : classes.cardPaid)}
        onClick={handleOpen}
      >
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
        ></Chip>
        <List>
          <ListItem>
            <Avatar>
              <ReceiptIcon />
            </Avatar>
            <Typography className={classes.text}>
              Invoice: {jobs.invoice}
            </Typography>
          </ListItem>
          <ListItem>
            <Avatar>
              <CalendarTodayIcon />
            </Avatar>
            <Typography className={classes.text}>Date: {jobs.date}</Typography>
          </ListItem>
          <ListItem>
            <Avatar>
              <HomeIcon />
            </Avatar>
            <Typography className={classes.text}>
              Address: {jobs.address}
            </Typography>
          </ListItem>

          <ListItem>
            <Avatar>
              <AttachMoneyIcon />
            </Avatar>
            <Typography className={classes.text}>
              Amount: {jobs.amount} ${" "}
            </Typography>
          </ListItem>
        </List>
      </Card>
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
            <JobItem jobs={jobs} callback={open} close={handleClose} ></JobItem>;
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};
export default ReportItem;
