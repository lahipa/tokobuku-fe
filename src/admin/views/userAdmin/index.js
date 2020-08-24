import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../../templates/layout/adminlayout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableDataShow from "./components/listItemUserAdmin";
import { dataLogin } from "../../../utils/globals";
import { getListUser } from "../../../store/actions/users";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
  inputFile: {
    display: "none",
  },
  dialogContent: {
    overflowY: "hidden",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const UserAdmins = (props) => {
  const { match, users, getListUser } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getListUser({ role: 1 }); // role is role_id, 1: admin, 2: member
    }
  }, [match]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  let i = 1;
  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h5">User Admin</Typography>
        <Typography variant="subtitle">
          Check and update user admin data.{" "}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users ? (
                  users.rows &&
                  users.rows.map((val) => {
                    return (
                      <TableDataShow
                        no={i++}
                        key={val.id}
                        listData={val}
                        //doUpdate={handleUpdate}
                        classes={classes}
                      />
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align="center" colspan="5">
                      <h5 style={{ fontSize: "16px", color: "#888" }}>
                        <i>Belum ada data tersimpan!</i>
                      </h5>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUser: (params) => dispatch(getListUser(params)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserAdmins)
);
