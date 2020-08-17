import React, { useState, useContext, useEffect } from "react";
import StatementContext from "../../context/statement/statementContext";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import {
  TextField,
  InputAdornment,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MessageIcon from "@material-ui/icons/Message";
import SaveIcon from "@material-ui/icons/Save";

const LogForm = ({ handleClose }) => {
  const useStyles = makeStyles((theme) => ({
    heading: {
      color: "#003699",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "22px",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    input: {
      width: "100%",
      marginBottom: "1rem",
    },
    btn: {
      width: "100%",
    },
    modalForm: {
      background: "white",
      padding: "1rem",
    },
  }));

  const classes = useStyles();
  const statementContext = useContext(StatementContext);

  const { addCashLog } = statementContext;

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    setLog({
      date: today,
      amount: "",
      description: "",
    });
  }, [statementContext, today]);

  const [log, setLog] = useState({
    date: today,
    amount: "",
    description: "",
  });

  const { date, amount, description } = log;

  const onChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addCashLog(log);
    setLog({ date: "", amount: "", description: "" });
    handleClose();
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.modalForm}>
      <form onSubmit={onSubmit}>
        <Typography className={classes.heading} align="center">
          Add Log
        </Typography>
        <TextField
          className={classes.input}
          name="date"
          variant="outlined"
          type="date"
          value={date}
          onChange={onChange}
        />
        <TextField
          className={classes.input}
          placeholder="Amount"
          name="amount"
          required
          type="text"
          variant="outlined"
          value={amount}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.input}
          placeholder="Description"
          name="description"
          type="text"
          variant="outlined"
          multiline={true}
          rows={3}
          value={description}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MessageIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Add a Log{" "}
        </Button>
      </form>
    </Container>
  );
};

export default LogForm;
