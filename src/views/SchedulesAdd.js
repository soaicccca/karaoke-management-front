import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { userActions, scheduleActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    height: "100px",
    width: "100px",
  },
  gridList: {
    height: "60vh",
  },
}));

const weekdaysOption = [
  { title: "Monday", value: "monday" },
  { title: "Tuesday", value: "tuesday" },
  { title: "Wednesday", value: "wednesday" },
  { title: "Thursday", value: "thursday" },
  { title: "Friday", value: "friday" },
  { title: "Saturday", value: "saturday" },
  { title: "Sunday", value: "sunday" },
];

const workingTimeOption = [
  { title: "Morning", value: "morning" },
  { title: "Afternoon", value: "afternoon" },
  { title: "Evening", value: "evening" },
];

export default function ScheduleAddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //   const [image, setImage] = React.useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [newSchedules, setNewSchedules] = React.useState([]);

  const [userOption, setUserOption] = React.useState([]);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (users.items) setUserOption([...users.items]);
  }, [users.items]);

  useEffect(() => {
    console.log(newSchedules);
  }, [newSchedules]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    dispatch(scheduleActions.add(newSchedules));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const addNewSchedulesClick = () => {
    setNewSchedules((newSchedules) => [
      ...newSchedules,
      { weekDay: "monday", workingTime: "morning", staff: "" },
    ]);
  };

  const weekDayToIndex = (weekDay) => {
    switch (weekDay) {
      case "monday":
        return 0;
      case "tuesday":
        return 1;
      case "wednesday":
        return 2;
      case "thursday":
        return 3;
      case "friday":
        return 4;
      case "saturday":
        return 5;
      case "sunday":
        return 6;
      default:
        return 0;
    }
  };
  const workingTimeToIndex = (workingTime) => {
    switch (workingTime) {
      case "morning":
        return 0;
      case "afternoon":
        return 1;
      case "evening":
        return 2;
      default:
        return 0;
    }
  };

  const handleWeekdaysSelected = (value, index) => {
    if (value) {
      setNewSchedules((state) => {
        let new_schedule = state;
        new_schedule[index].weekDay = value.value;

        return [...new_schedule];
      });
    }
  };

  const handleWorkingTimeSelected = (value, index) => {
    if (value) {
      setNewSchedules((state) => {
        let new_schedule = state;
        new_schedule[index].workingTime = value.value;

        return [...new_schedule];
      });
    }
  };

  const handleUserSelected = (value, index) => {
    if (value) {
      setNewSchedules((state) => {
        let new_schedule = state;
        new_schedule[index].staff = value.id;

        return [...new_schedule];
      });
    }
  };

  const onDelete = (index) => {
    newSchedules.splice(index, 1);
    setNewSchedules([...newSchedules]);
  };

  return (
    <div>
      <Tooltip title="Add new">
        <IconButton aria-label="add-new" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="md" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new Schedule
              </Typography>
              <Grid
                style={{ marginTop: "10px" }}
                container
                justify="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addNewSchedulesClick}
                  >
                    Add new Schedule
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                {newSchedules.length > 0 &&
                  newSchedules.map((schedule) => (
                    <Grid style={{ marginTop: "10px" }} item xs={12} container>
                      <Grid item xs={3}>
                        <Autocomplete
                          options={weekdaysOption}
                          onChange={(e, value) =>
                            handleWeekdaysSelected(
                              value,
                              newSchedules.indexOf(schedule)
                            )
                          }
                          value={
                            weekdaysOption[weekDayToIndex(schedule.weekDay)]
                          }
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Weekdays"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Autocomplete
                          options={workingTimeOption}
                          onChange={(e, value) =>
                            handleWorkingTimeSelected(
                              value,
                              newSchedules.indexOf(schedule)
                            )
                          }
                          value={
                            workingTimeOption[
                              workingTimeToIndex(schedule.workingTime)
                            ]
                          }
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Working Time"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Autocomplete
                          options={userOption}
                          onChange={(e, value) =>
                            handleUserSelected(
                              value,
                              newSchedules.indexOf(schedule)
                            )
                          }
                          //   value={
                          //     weekdaysOption[weekDayToIndex(schedule.weekDay)]
                          //   }
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Weekdays"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          variant="text"
                          onClick={(e) =>
                            onDelete(newSchedules.indexOf(schedule))
                          }
                        >
                          DEL
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
              <Grid
                style={{ marginTop: "10px" }}
                container
                justify="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
