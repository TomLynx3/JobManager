import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import {
  Typography,
  List,
  ListItem,
  Card,
  Avatar,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core/";
import JobItem from "../jobs/JobItem";

const BreakdownItem = ({ jobs }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles(() => ({
    card: {
      padding: "1rem",
      fontSize: "20px",
    },
    grid: {
      backgroundColor: "#00C6CF",
    },
    text: {
      fontWeight: "bold",
    },
    textGreen: {
      fontWeight: "bold",
      color: "#009063",
    },
    avatar: {
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

  const { date, address, total_earned, invoice } = jobs;

  return (
    <div>
      <Card className={classes.card} onClick={handleOpen}>
        <List>
          <ListItem>
            <Avatar className={classes.avatar}>
              <ReceiptIcon></ReceiptIcon>
            </Avatar>
            <Typography className={classes.text}>{invoice}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <CalendarTodayIcon />
            </Avatar>
            <Typography className={classes.text}>{date}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <HomeIcon />
            </Avatar>
            <Typography className={classes.text}>{address}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
            <Typography
              component="h3"
              variant="h6"
              className={classes.textGreen}
            >
              Earned: {total_earned} $
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
            <JobItem jobs={jobs}></JobItem>;
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BreakdownItem;
