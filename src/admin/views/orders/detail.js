import React, { useState, useEffect, Fragment } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../../templates/layout/adminlayout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { dataLogin } from "../../../utils/globals";
import {
  getOrderById,
  updateOrder,
  getNotification,
} from "../../../store/actions/orders";
import {
  getDayFormat,
  getMonthFormat,
  convertToIdr,
} from "../../../components/functions/convert";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const OrderDetail = (props) => {
  const [data, setData] = useState("");
  const { match, order, getOrderById, updateOrder, getNotification } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match && match.params) {
      getOrderById(match.params.id);
    }
  }, [match, getOrderById]);

  useEffect(() => {
    if (order) {
      setData({
        proceed: true,
      });
      getNotification({ proceed: 0 });
    }
  }, [order]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  const handleUpdate = () => {
    updateOrder(match.params.id, data);
  };

  let dataTime = new Date(order.created_at);

  return (
    <Layout>
      <Box mb={3}>
        <Typography variant="h5">Order Detail</Typography>
        <Typography variant="subtitle">
          Transaction id: {order.transaction_id}{" "}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={7}>
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Order Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {getDayFormat(dataTime.getDay())}, {dataTime.getDate()}-
                      {getMonthFormat(dataTime.getMonth())}-
                      {dataTime.getFullYear()}{" "}
                      {`${dataTime.getHours()}:${dataTime.getMinutes()}`}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Customer Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {order.customers_detail && order.customers_detail.name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {order.customers_detail && order.customers_detail.email}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={4} mb={2}>
            <Typography variant="h5">Price Detail</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>Desc.</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Sub. Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orders_detail &&
                  order.orders_detail.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell>{val.title}</TableCell>
                        <TableCell align="center">{val.quantity}</TableCell>
                        <TableCell align="right">
                          {convertToIdr(val.price)}
                        </TableCell>
                        <TableCell align="right">
                          {convertToIdr(val.total)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={2}>Discount/Service Fee</TableCell>
                  <TableCell align="right">0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {convertToIdr(order.total_price)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={4}>
          <Card className={classes.root}>
            <CardContent>
              {order.proceed ? (
                <Alert severity="success">
                  Transaksi: {order.transaction_id}, sudah di proses! Segera
                  kirim barang pesanan
                </Alert>
              ) : (
                <Alert severity="warning">
                  Transaksi: {order.transaction_id}, apakah ingin di proses?
                  periksa kembali pembayaran di bank
                </Alert>
              )}
            </CardContent>
            {order.proceed ? (
              ""
            ) : (
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleUpdate}
                >
                  Process
                </Button>
              </CardActions>
            )}
          </Card>
          <Box mt={1}>
            <Button
              fullWidth
              onClick={() => {
                history.push("/imcoolmaster/orders");
              }}
            >
              Kembali
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.orderReducer.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderById: (id) => dispatch(getOrderById(id)),
    updateOrder: (id, data) => dispatch(updateOrder(id, data)),
    getNotification: (params) => dispatch(getNotification(params)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
);
