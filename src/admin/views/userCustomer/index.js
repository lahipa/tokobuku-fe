import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
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
  TableSortLabel,
  TextField,
  MenuItem,
  Fab,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import TableDataShow from "./components/listItemUserCustomer";
import { dataLogin } from "../../../utils/globals";
import { getListUser, updateUser } from "../../../store/actions/users";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: "hidden",
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const UserCustomers = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortType, setSortType] = useState("DESC");
  const { match, users, getListUser, updateUser } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getListUser({
        limit: limit,
        page: page,
        sort_by: sortBy,
        sort_type: sortType,
        role: 2, // role is role_id, 1: admin, 2: member
      });
    }
  }, [match, limit, page, sortBy, sortType]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  const handleUpdate = (id, data) => {
    updateUser(id, data);
  };
  const jmlPage = Math.ceil(users.count / users.limit);
  let i = 1;

  const handleChangePage = (e, val) => {
    setPage(val);
  };

  const handleSort = (val) => {
    const isAsc = sortBy === val && sortType === "ASC";
    console.log(isAsc, "asc?");
    setSortType(isAsc ? "DESC" : "ASC");
    setSortBy(val);
  };

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h5">Data Customer</Typography>
        <Typography variant="subtitle">
          Check and update on customer data.{" "}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "created_at"}
                      direction={sortType.toLowerCase()}
                      onClick={() => {
                        handleSort("created_at");
                      }}
                    >
                      Create
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "updated_at"}
                      direction={
                        sortBy === "updated_at" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("updated_at");
                      }}
                    >
                      Update
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={
                        sortBy === "name" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("name");
                      }}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "username"}
                      direction={
                        sortBy === "username" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("username");
                      }}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "email"}
                      direction={
                        sortBy === "email" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("email");
                      }}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
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
                        doUpdate={handleUpdate}
                        classes={classes}
                      />
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align="center" colspan="6">
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
      <Box pt={5} pr={5}>
        <Grid container spacing={3} justify="flex-end" alignItems="center">
          <Typography>Rows per page:</Typography>
          <Box pl={2} pr={3}>
            <TextField
              select
              className={classes.select}
              InputProps={{ classes }}
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </TextField>
          </Box>

          <Pagination
            count={jmlPage}
            page={page}
            boundaryCount={3}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Box>
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
    updateUser: (id, data) => dispatch(updateUser(id, data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCustomers)
);
