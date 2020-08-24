import React, { useState, useEffect } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { ENDPOINT } from "../utils/globals";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  DialogContent,
  Typography,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Avatar,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSnackbar } from "notistack";
//import { loginUser } from "../store/actions/users";
import { getListCart } from "../store/actions/cart";
import { dataLogin } from "../utils/globals";

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    width: "100%",
  },
}));

const Login = (props) => {
  const [data, setData] = useState({});
  const {
    user,
    isLogin,
    handleOpen,
    handleClose,
    loginUser,
    getListCart,
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user && isLogin) {
      getListCart(user.user && user.user.uid, user.token);
    }
  }, [user]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post(`${ENDPOINT}/users/login`, data);

      loginUser({ data: request.data.data, isLogin: true });

      window.localStorage.setItem(
        "dataLogin",
        JSON.stringify(request.data.data)
      );

      handleClose();
      enqueueSnackbar("Berhasil login, mohon tunggu", { variant: "success" });
    } catch (err) {
      console.log(err.response);
      enqueueSnackbar(err.response.data.status.message, {
        variant: "error",
      });
    }
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  return (
    <DialogContent className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {/* {user.status ? (
        <Box className={classes.box} mt={2}>
          <Alert severity="error">Username / Password tidak sama</Alert>
        </Box>
      ) : (
        ""
      )} */}
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
            <Link onClick={handleOpen("register")} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: ({ data, isLogin }) =>
      dispatch({ type: "LOGIN", data, isLogin }),
    //loginUser: (data) => dispatch(loginUser(data)),
    getListCart: (id, token) => dispatch(getListCart(id, token)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
