import React, { useState, useContext } from "react";
import clsx from "clsx";
import { Grid, Typography, Fab, CardContent, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { NotificationManager } from "react-notifications";
import JobContext from "../../context/jobs/jobContext";

const Upload = () => {
  const jobContext = useContext(JobContext);

  const { sendFile } = jobContext;

  const [file, setFile] = useState({
    file: null,
  });

  const onChange = (e) => {
    setFile({ file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file.file) {
      sendFile(file);
      setFile({ file: null });
    } else {
      NotificationManager.error("Please Upload The File", "Error!", 2500);
    }
  };

  const useStyles = makeStyles((theme) => ({
    cardContent: {
      textAlign: "center",
    },
    input: {
      display: "none",
    },
    buttonUp: {
      color: "#57C991",
      background: "green",
      marginLeft: "2rem",
    },
    button: {
      marginLeft: "2rem",
    },
    text: {
      fontWeight: "bold",
    },
    upload: {
      marginTop: "2rem",
      width: "60%",
    },
    uploadGreen: {
      width: "60%",
      marginTop: "2rem",
      background: "green",
    },
  }));

  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <Grid container justify="center" alignItems="center">
        <Typography className={classes.text}>Upload Invoice</Typography>

        <input
          accept="pdf"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
        />
        <label htmlFor="contained-button-file">
          <Fab
            component="span"
            className={clsx(
              file.file != null ? classes.buttonUp : classes.button
            )}
          >
            <CloudUploadIcon />
          </Fab>
        </label>
      </Grid>
      <Button
        variant="contained"
        className={clsx(
          file.file != null ? classes.uploadGreen : classes.upload
        )}
        onClick={onSubmit}
        startIcon={<SendIcon />}
      >
        Upload
      </Button>
    </CardContent>
  );
};
export default Upload;
