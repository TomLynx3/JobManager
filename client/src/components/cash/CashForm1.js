import React, { useState, useEffect, useContext } from "react";
import JobContext from "../../context/jobs/jobContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputAdornment,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

const CashForm = ({ component, handleCloseForm }) => {
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

  const jobContext = useContext(JobContext);

  const today = moment().format("YYYY-MM-DD");

  const { addJobCash, current, clearCurrent, updateCashJob } = jobContext;
  useEffect(() => {
    if (current !== null) {
      setJob(current);
    } else {
      setJob({
        date: today,
        address: "",
        material: 0,
        amount: "",
        description: "",
      });
    }
  }, [jobContext, current, today]);

  const [job, setJob] = useState({
    date: today,
    address: "",
    material: "",
    amount: "",
    description: "",
  });
  const { date, address, material, amount, description } = job;

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addJobCash(job);
    } else {
      updateCashJob(job);
      handleCloseForm();
      clearCurrent();
    }

    setJob({
      date: "",
      address: "",
      material: 0,
      amount: "",
      description: "",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      className={component == "Modal" ? classes.modalForm : classes.form}
    >
      <Typography className={classes.heading} align="center">
        {component == "Modal" ? "Edit Cash Job" : "Add a Cash Job"}
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
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
          placeholder="Address"
          name="address"
          type="text"
          required
          variant="outlined"
          value={address}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <HomeIcon></HomeIcon>
              </InputAdornment>
            ),
          }}
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
          placeholder="Material"
          name="material"
          type="text"
          variant="outlined"
          value={material}
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
        {current ? (
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit Cash Job
          </Button>
        ) : (
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save a Cash Job{" "}
          </Button>
        )}
      </form>
    </Container>
  );
};

export default CashForm;
