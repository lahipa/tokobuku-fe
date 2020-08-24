import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, dataLogin } from "../utils/globals";
import Layout from "../templates/layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
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
}));

const PageLogin = (props) => {
  const [data, setData] = useState({});

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(`${ENDPOINT}/users/login`, data);

      if (request.data.isLogin) {
        window.localStorage.setItem(
          "dataLogin",
          JSON.stringify(request.data.data)
        );

        setTimeout(function () {
          window.location.href = "/";
          enqueueSnackbar(request.data.message, { variant: "success" });
        }, 500);
      } else {
        enqueueSnackbar(request.data.message, { variant: "error" });
      }
    } catch (err) {
      return enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
    console.log(data, "Data input from login");
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
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={(e) => onSubmitLogin(e)}
                noValidate
              >
                <TextField
                  onChange={(e) => handleForm(e, "username")}
                  id="username"
                  label="Username"
                  autoFocus
                  required
                  fullWidth
                  autoComplete="username"
                  variant="outlined"
                  margin="normal"
                />
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
                  margin="normal"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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

export default withRouter(PageLogin);
