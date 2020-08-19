import React, { useContext, useState } from "react";
import StatementContext from "../../context/statement/statementContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MessageIcon from "@material-ui/icons/Message";
import BuildIcon from "@material-ui/icons/Build";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  Avatar,
  Typography,
  Chip,
} from "@material-ui/core";

const MaterialItem = ({ material }) => {
  const useStyles = makeStyles(() => ({
    card: {
      minWidth: 275,
      background: "#E4E3E5",
      marginBottom: "1rem",
      margin: "1rem",
    },
    buttons: {
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    btnRed: {
      background: "#574142",
    },
    avatar: {
      marginRight: "1rem",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const statementContext = useContext(StatementContext);

  const { deleteMaterial } = statementContext;
  const onDelete = () => {
    deleteMaterial(material._id);
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          className={classes.buttons}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Chip
            avatar={
              <Avatar>
                {material.type === "Material" ? (
                  <BuildIcon />
                ) : (
                  <LocalGasStationIcon />
                )}
              </Avatar>
            }
            variant="outlined"
            size="small"
            label={material.type}
            color={material.type === "Material" ? "secondary" : "primary"}
            onClick={onDelete}
          ></Chip>
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              className={classes.btnRed}
              onClick={handleOpen}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <List>
          <ListItem>
            <Avatar className={classes.avatar}>
              <CalendarTodayIcon />
            </Avatar>
            <Typography>Date: {material.date}</Typography>
          </ListItem>
          <ListItem>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon color="secondary" />
            </Avatar>
            <Typography>
              Amount: {material.amount}
              {"$"}
            </Typography>
          </ListItem>
        </List>

        <ListItem>
          <Avatar className={classes.avatar}>
            <MessageIcon />
          </Avatar>
          <Typography>Description: {material.description}</Typography>
        </ListItem>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this log?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={onDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MaterialItem;
