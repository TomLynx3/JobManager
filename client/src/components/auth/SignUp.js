import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  CssBaseline,
  TextField,
  Avatar,
  Typography,
  Container,
  Button,
} from "@material-ui/core/";
import Loading from "../layout/Loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    height: "80vh",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function SignUp(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    error,
    clearErrors,
    loading,
    signUpSuccess,
    register,
    msg,
  } = authContext;

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (signUpSuccess === true) {
      props.history.push("/login");
    }

    if (msg && msg.length > 0) {
      setAlert(msg, "success");
      clearErrors();
    }
    if (error && error.length > 0) {
      setAlert(error, "error");
      clearErrors();
    }
  }, [msg, error, props.history]);
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const { name, password, email, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || name === "") {
      setAlert("Please fill in all fields", "error");
      clearErrors();
    } else if (password.length < 6) {
      setAlert("Password must be at least 6 characters", "error");
      clearErrors();
    } else if (password !== password2) {
      setAlert("Passwords do not match", "error");
      clearErrors();
    } else {
      trackPromise(
        register({
          email,
          name,
          password,
        })
      );
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {promiseInProgress === true ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={name}
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password Confirmation"
              type="password"
              autoComplete="current-password"
              value={password2}
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
}
