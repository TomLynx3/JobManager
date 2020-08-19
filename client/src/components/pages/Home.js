import React, { useContext, useEffect, useState } from "react";
import Jobs from "../jobs/Jobs";
import JobForm from "../jobs/JobForm";
import CashForm1 from "../cash/CashForm1";
import AuthContext from "../../context/auth/authContext";
import JobContext from "../../context/jobs/jobContext";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button, Grid } from "@material-ui/core";

const Home = () => {
  const authContext = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { clearCash, clearFilter } = jobContext;

  useEffect(() => {
    authContext.loadUser();

    clearCash();
    clearFilter();

    //eslint-disable-next-line
  }, []);

  const [selected, setSeclected] = useState({
    component: "Job",
  });

  const addJob = () => {
    setSeclected({ component: "Job" });
  };
  const addCashJob = () => {
    setSeclected({ component: "Cash" });
  };
  return (
    <Grid>
      <Grid container direction="row" spacing={4}>
        <Grid item md={6} xs={12} sm={6}>
          <Button
            disabled={selected.component === "Job" ? true : false}
            variant="contained"
            color="primary"
            onClick={addJob}
            startIcon={<AddCircleIcon />}
            fullWidth={true}
          >
            Add Job
          </Button>
        </Grid>

        <Grid item md={6} xs={12} sm={6}>
          <Button
            disabled={selected.component === "Cash" ? true : false}
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={addCashJob}
            fullWidth={true}
          >
            Add Cash Job
          </Button>
        </Grid>
        <Grid container direction="row" spacing={4}>
          <Grid item md={6} xs={12} sm={6}>
            {selected.component === "Job" ? <JobForm /> : <CashForm1 />}
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <Jobs />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
