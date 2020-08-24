import React, { useEffect, Fragment } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../../templates/layout/adminlayout";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
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
  IconButton,
  Chip,
} from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/Add";
import TableDataShow from "./components/listItemOrder";
import { dataLogin } from "../../../utils/globals";
import { getAllListOrder } from "../../../store/actions/orders";

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

const Orders = (props) => {
  const { match, orders, getListOrder } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getListOrder();
    }
  }, [match]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  let x = Math.ceil(orders.count / orders.limit);
  let i = 1;

  const columns = [
    {
      name: "name",
      label: "Customer Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "qty",
      label: "Qty",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      option: {
        filter: true,
      },
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "disc",
      label: "Disc.",
      options: {
        filter: false,
      },
    },
    {
      name: "summary",
      label: "Summary",
    },
    {
      name: "action",
      label: "Action",
      options: {
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "select",
  };

  //const data = [];
  const data =
    orders.rows &&
    orders.rows.map((val) => ({
      name: val.customers_detail && val.customers_detail.name,
      email: val.customers_detail && val.customers_detail.email,
      qty: val.total,
      status: val.proceed ? "success" : "pending",
      price: val.total_price,
      disc: 0,
      summary: val.total_price - 0,
      action: (
        <Fragment>
          <Link to={`/imcoolmaster/orders/${val.id}`}>
            <IconButton color="primary" aria-label="edit">
              <EditRounded />
            </IconButton>
          </Link>
        </Fragment>
      ),
    }));

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
          <MUIDataTable
            title={"Orders"}
            data={data}
            columns={columns}
            options={options}
          />
          {/* <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Disc</TableCell>
                  <TableCell align="right">Summary</TableCell>
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
          </TableContainer> */}
        </Grid>
      </Grid>
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
    getListOrder: () => dispatch(getAllListOrder()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
