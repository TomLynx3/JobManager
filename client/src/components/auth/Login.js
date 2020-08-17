import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  CssBaseline,
  TextField,
  Avatar,
  Typography,
  Container,
  Button,
  Checkbox,
  FormControlLabel,
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

export default function SignIn(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    loaded,
    loading,
    loadUser,
    loadingSpinner,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, "error");
      clearErrors();
    }
    if (localStorage.name && localStorage.password) {
      setUser({ name: localStorage.name, password: localStorage.password });
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [checked, setChecked] = useState(false);

  const [forget, setForget] = useState(false);

  const { name, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleForget = () => {
    setForget(!forget);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "") {
      setAlert("Please fill in all fields", "error");
    } else {
      login({
        name,
        password,
      });
      loadingSpinner(true);
      if (checked) {
        localStorage.name = name;
        localStorage.password = password;
      }
      if (forget) {
        localStorage.removeItem("name");
        localStorage.removeItem("password");
      }
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading === true ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checked"
                />
              }
              label="Remember me"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={forget}
                  onChange={handleForget}
                  name="checked"
                />
              }
              label="Forget Credentials"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
}
