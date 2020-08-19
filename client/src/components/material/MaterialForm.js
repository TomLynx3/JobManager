import React, { useState, useContext, useEffect } from "react";
import StatementContext from "../../context/statement/statementContext";
import { makeStyles } from "@material-ui/core/styles";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import moment from "moment";
import Loading from "../layout/Loading";
import {
  TextField,
  InputAdornment,
  Container,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MessageIcon from "@material-ui/icons/Message";
import SaveIcon from "@material-ui/icons/Save";

const MaterialForm = ({ handleClose }) => {
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

  const { promiseInProgress } = usePromiseTracker();

  const classes = useStyles();
  const statementContext = useContext(StatementContext);

  const { addMaterial } = statementContext;

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    setMaterial({
      date: today,
      amount: "",
      description: "",
      type: "Material",
    });
  }, [today]);
  const [material, setMaterial] = useState({
    date: today,
    amount: "",
    description: "",
    type: "Material",
  });

  const { date, amount, description, type } = material;

  const onChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    trackPromise(addMaterial(material));
    setMaterial({ date: "", amount: "", description: "", type: "Material" });
    handleClose();
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.modalForm}>
      {promiseInProgress === true ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit}>
          <Typography className={classes.heading} align="center">
            Add {type === "Material" ? "Material" : "Gas"}
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
          <FormLabel component="legend">Material Type</FormLabel>
          <RadioGroup
            row
            aria-label="material"
            name="type"
            value={type}
            onChange={onChange}
          >
            <FormControlLabel
              value="Material"
              control={<Radio color="secondary" />}
              label="Material"
            />
            <FormControlLabel
              value="Gas"
              control={<Radio color="primary" />}
              label="Gas"
            />
          </RadioGroup>
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
            Add {type === "Material" ? "Material" : "Gas"}
          </Button>
        </form>
      )}
    </Container>
  );
};

export default MaterialForm;
