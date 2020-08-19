import React, { useState, useEffect, useContext } from "react";
import JobContext from "../../context/jobs/jobContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SaveIcon from "@material-ui/icons/Save";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../layout/Loading";
import moment from "moment";
import {
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
  Fade,
  Typography,
  Button,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";

const JobForm = ({ component, handleCloseForm }) => {
  const jobContext = useContext(JobContext);

  const { addJob, current, clearCurrent, updateJob } = jobContext;

  const { promiseInProgress } = usePromiseTracker();

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
    modalForm: {
      background: "white",
      padding: "1rem",
    },
    input: {
      width: "100%",
      marginBottom: "1rem",
    },
    btn: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (current !== null) {
      setJob(current);
    } else {
      setJob({
        invoice: "",
        date: today,
        address: "",
        company: "Express",
        type: "Service",
        material: 0,
        amount: "",
        description: "",
        percentage: "10",
      });
    }
  }, [jobContext, current, today]);

  const [job, setJob] = useState({
    invoice: "",
    date: today,
    address: "",
    company: "Express",
    type: "Service",
    material: 0,
    amount: "",
    description: "",
    percentage: "10",
  });

  const {
    date,
    address,
    material,
    amount,
    description,
    company,
    invoice,
    type,
    percentage,
  } = job;

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      trackPromise(addJob(job));
    } else {
      trackPromise(updateJob(job));
      clearAll();
      handleCloseForm();
    }

    setJob({
      date: today,
      invoice: "",
      address: "",
      company: "",
      type: "",
      material: 0,
      amount: "",
      description: "",
      percentage: "10",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={component === "Modal" ? classes.modalForm : classes.form}
    >
      <Typography className={classes.heading} align="center">
        {current ? "Edit Job" : "Add Job"}
      </Typography>
      {promiseInProgress === true ? (
        <Loading />
      ) : (
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            className={classes.input}
            name="date"
            variant="outlined"
            type="date"
            value={date}
            onChange={onChange}
            required
          />
          <TextField
            className={classes.input}
            placeholder="Invoice Number"
            name="invoice"
            type="text"
            variant="outlined"
            value={invoice}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ReceiptIcon></ReceiptIcon>
                </InputAdornment>
              ),
            }}
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

          <FormLabel component="legend">Company</FormLabel>
          <RadioGroup
            row
            aria-label="Company"
            name="company"
            value={company}
            onChange={onChange}
          >
            <FormControlLabel
              value="Express"
              control={<Radio color="secondary" />}
              label="Express Plumbing"
            />
            <FormControlLabel
              value="Energy"
              control={<Radio color="primary" />}
              label="Energy Plumbing"
            />
          </RadioGroup>
          <FormLabel component="legend">Work Type</FormLabel>
          <RadioGroup
            row
            aria-label="Type"
            name="type"
            value={type}
            onChange={onChange}
          >
            <FormControlLabel
              value="Service"
              control={<Radio color="secondary" />}
              label="Service"
            />
            <FormControlLabel
              value="Excavation"
              control={<Radio color="primary" />}
              label="Excavation"
            />
          </RadioGroup>
          {type === "Excavation" ? (
            <Fade in={type === "Excavation"} timeout={1500}>
              <div>
                <FormLabel component="legend">Commission Amount</FormLabel>
                <RadioGroup
                  row
                  aria-label="Percentage"
                  name="percentage"
                  value={percentage}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="10"
                    control={<Radio color="primary" />}
                    label="10%"
                  />
                  <FormControlLabel
                    value="35"
                    control={<Radio color="primary" />}
                    label="35%"
                  />
                  <FormControlLabel
                    value="45"
                    control={<Radio color="primary" />}
                    label="45%"
                  />
                </RadioGroup>
              </div>
            </Fade>
          ) : null}

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
              Edit Job
            </Button>
          ) : (
            <Button
              className={classes.btn}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save Job{" "}
            </Button>
          )}
        </form>
      )}
    </Container>
  );
};

export default JobForm;
