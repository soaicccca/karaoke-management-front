import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import { userActions } from "../actions";

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

export default function UserAddModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //   const [image, setImage] = React.useState("");
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    salary: 0,
  });

  const { name, email, password, salary } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    dispatch(userActions.add(formData));
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
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
                Add new Category
              </Typography>
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="User name"
                id="outlined-name"
                variant="outlined"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="User email"
                id="outlined-name"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="Password"
                id="outlined-name"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
              <TextField
                fullWidth
                style={{ marginTop: "10px" }}
                label="Salary"
                id="outlined-name"
                variant="outlined"
                name="salary"
                value={salary}
                onChange={(e) => onChange(e)}
                onKeyPress={(e) => keyPressed(e)}
              />
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
