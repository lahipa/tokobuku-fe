import React, { useState, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { dataLogin } from "../utils/globals";
import Layout from "../templates/layout";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { registerUser } from "../store/actions/users";

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(registerUser(data)),
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(20),
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

const PageRegister = (props) => {
  const [data, setData] = useState({});
  const classes = useStyles();

  const onSubmitRegistrasi = (e) => {
    e.preventDefault();
    props.register(data);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, role_id: 2, [formName]: e.target.value });
    //console.log(data, "Data input from registrasi");
  };

  return (
    <>
      {dataLogin ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(e) => handleForm(e, "username")}
                      id="username"
                      label="Username"
                      autoFocus
                      required
                      fullWidth
                      autoComplete="uname"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
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
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Fragment>
      )}
    </>
  );
};

export default withRouter(connect(null, mapDispatchToProps)(PageRegister));
