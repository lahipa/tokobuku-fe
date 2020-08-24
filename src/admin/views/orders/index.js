import React, { useEffect, useState } from "react";
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
  TableSortLabel,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import TableDataShow from "./components/listItemOrder";
import { dataLogin } from "../../../utils/globals";
import { getAllListOrder } from "../../../store/actions/orders";

const useStyles = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

const Orders = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortType, setSortType] = useState("DESC");
  const [relate, setRelate] = useState("");
  const { match, orders, getListOrder } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getListOrder({
        limit: limit,
        page: page,
        sort_by: sortBy,
        sort_type: sortType,
        relate: relate,
      });
    }
  }, [match, limit, page, sortBy, sortType, relate]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  const jmlPage = Math.ceil(orders.count / orders.limit);
  let i = 1;

  const handleChangePage = (e, val) => {
    setPage(val);
  };

  const handleSort = (val, relate) => {
    const isAsc = sortBy === val && sortType === "ASC";

    setSortType(isAsc ? "DESC" : "ASC");
    setSortBy(val);
    setRelate(relate);
  };

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h5">Orders</Typography>
        <Typography variant="subtitle">
          Check and update orders data.{" "}
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
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={
                        sortBy === "name" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("name", "customers_detail");
                      }}
                    >
                      Cust. Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "email"}
                      direction={
                        sortBy === "email" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("email", "customers_detail");
                      }}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === "total"}
                      direction={
                        sortBy === "total" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("total");
                      }}
                    >
                      Qty
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortBy === "proceed"}
                      direction={
                        sortBy === "proceed" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("proceed");
                      }}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === "total_price"}
                      direction={
                        sortBy === "total_price"
                          ? sortType.toLowerCase()
                          : "asc"
                      }
                      onClick={() => {
                        handleSort("total_price");
                      }}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders ? (
                  orders.rows &&
                  orders.rows.map((val) => {
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
                    <TableCell align="center" colspan="8">
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
    orders: state.orderReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListOrder: (params) => dispatch(getAllListOrder(params)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
