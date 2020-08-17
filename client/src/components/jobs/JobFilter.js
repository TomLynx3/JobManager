import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import BrushIcon from "@material-ui/icons/Brush";
import JobContext from "../../context/jobs/jobContext";
import AlertContext from "../../context/alert/alertContext";

const JobFilter = () => {
  const jobContext = useContext(JobContext);
  const { filterJobs, clearFilter, filtred } = jobContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [text, setText] = useState({
    address: "",
    date: "",
    invoice: "",
  });

  const { address, date, invoice } = text;
  const onChange = (e) => setText({ ...text, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      filtred ||
      text.address !== "" ||
      text.date !== "" ||
      text.invoice !== ""
    ) {
      filterJobs(text);
    } else {
      setAlert("Please fill form", "error");
    }
  };

  const clearAll = () => {
    setText({ address: "", date: "", invoice: "" });
    clearFilter();
  };

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
      marginBottom: "1rem",
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Typography className={classes.heading} align="center">
        Find Job
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          className={classes.input}
          name="date"
          variant="outlined"
          type="date"
          value={date}
          onChange={onChange}
          disabled={text.address !== "" || text.invoice !== "" ? true : false}
        />
        <TextField
          className={classes.input}
          placeholder="Use Address "
          name="address"
          type="text"
          variant="outlined"
          value={address}
          disabled={text.date !== "" || text.invoice !== "" ? true : false}
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
          placeholder="Use Invoice Number"
          name="invoice"
          type="text"
          variant="outlined"
          value={invoice}
          disabled={text.date !== "" || text.address !== "" ? true : false}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ReceiptIcon></ReceiptIcon>
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
        {filtred && (
          <Button
            className={classes.btn}
            onClick={clearAll}
            variant="contained"
            color="primary"
            startIcon={<BrushIcon />}
          >
            Clear
          </Button>
        )}
      </form>
    </Container>
  );
};

export default JobFilter;
