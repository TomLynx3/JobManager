import React, { useContext } from "react";
import clsx from "clsx";
import AuthContext from "../../context/auth/authContext";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Breakdown1 from "../pages/Breakdown1";
import SignUp from "../auth/SignUp";
import Clock from "./Clock";
import Login from "../auth/Login";
import Search from "../pages/Search";
import Confirm from "../auth/Confirm";
import Home from "../pages/Home";
import Report from "../reports/Report";
import Logout from "../auth/Logout";
import Cash from "../pages/Cash";
import PrivateRoute from "../routing/PrivateRoute";
import AllJobs from '../pages/AllJobs'
import Material from "../pages/Material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
    // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "90vh",
  },
}));

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Icon className="fas fa-paste" />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Job Manager
          </Typography>
          <Clock></Clock>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <Divider />
        {!isAuthenticated ? (
          <List>{secondaryListItems}</List>
        ) : (
          <List>{mainListItems}</List>
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <NotificationContainer />
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute path="/cash" component={Cash}></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/report"
                    component={Report}
                  ></PrivateRoute>
                  <PrivateRoute exact path="/alljobs" component={AllJobs}> 
                  </PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/breakdown"
                    component={Breakdown1}
                  />
                  <PrivateRoute exact path="/material" component={Material} />
                  <PrivateRoute exact path="/search" component={Search} />
                  <PrivateRoute exact path="/logout" component={Logout} />
                  <Route exact path="/register" component={SignUp} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/users/:token" component={Confirm} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
