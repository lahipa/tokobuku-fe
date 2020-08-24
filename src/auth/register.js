import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  DialogContent,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import { registerUser } from "../store/actions/users";
import { useSnackbar } from "notistack";

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(registerUser(data)),
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(5),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const { handleOpen, handleClose } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitRegistrasi = async (e) => {
    e.preventDefault();

    props.register(data);
    handleClose();
    enqueueSnackbar("Registrasi berhasi! Silahkan login", {
      variant: "success",
    });
  };

  const handleForm = (e, formName) => {
    let inputData = e.target.value.toLowerCase();

    setData({
      ...data,
      role_id: 2,
      [formName]: inputData,
    });

    //console.log(data, "Data input from registrasi");
  };

  return (
    <DialogContent className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={(e) => onSubmitRegistrasi(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleForm(e, "name")}
              id="fullName"
              label="Full Name"
              autoFocus
              required
              fullWidth
              autoComplete="fullname"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleForm(e, "username")}
              //onChange={(e) => setUsername(e.target.value)}
              id="username"
              label="Username"
              autoFocus
              required
              fullWidth
              autoComplete="uname"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleForm(e, "password")}
              type="password"
              id="password"
              label="Password"
              autoFocus
              required
              fullWidth
              autoComplete="current-password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => handleForm(e, "email")}
              type="email"
              id="email"
              label="Email"
              autoFocus
              required
              fullWidth
              autoComplete="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link onClick={handleOpen("login")} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
  );
};

export default connect(null, mapDispatchToProps)(Register);
