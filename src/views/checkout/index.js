import React, { useState, useEffect } from "react";
import { useHistory, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../templates/layout";
import { ENDPOINT, dataLogin } from "../../utils/globals";
import jwtDecode from "jwt-decode";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  substractFromCart,
  removeFromCart,
  addToCart,
} from "../../store/actions/cart";
import { createOrder } from "../../store/actions/orders";
import { getBookById, updateBook } from "../../store/actions/books";
import { getUserById } from "../../store/actions/users";
import ListCart from "./components/cartListItem";
import { convertToIdr } from "../../components/functions/convert";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
  },
  actionCheckout: {
    height: "140px",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-around",
  },
  buttonLink: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
  },
}));

const Checkout = (props) => {
  //const [dataOrder, setDataOrder] = useState({});
  const [isOrdered, setIsOrdered] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const {
    user,
    carts,
    isLogin,
    addToCart,
    substractFromCart,
    removeFromCart,
    createOrder,
    book,
    getBookById,
    updateBook,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    //getListCart(dataLogin.user.uid);
    setTransactionId(generateTransactionId());
  }, []);

  const uid = dataLogin
    ? dataLogin.user.uid
    : user
    ? user.user && user.user.uid
    : "";

  const token = dataLogin ? dataLogin.token : user ? user.token : "";
  const tokenDecoded = jwtDecode(token);
  console.log(tokenDecoded);

  const handleAdd = (data) => {
    addToCart(data, user.token);
  };

  const handleSubtract = (id, data) => {
    substractFromCart(id, data, user.token);
  };

  const handleRemove = (id) => {
    removeFromCart(id, uid, user.token);
  };

  const generateTransactionId = () => {
    // ramdom unique id
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const removeCartBulk = () => {
    carts && carts.map((val) => removeFromCart(val.id, uid, user.token));
  };

  let arrayTotalHarga = carts && carts.map((val) => val.books.harga * val.qty);

  // arrayName.reduce((nextVal, currentVal) => nextVal + currentVal, 0)
  // ** currentVal bernilai array dari array yg dijumlahkan, tambahkan key untuk mendapatkan value dari spesifik object
  let grandTotalHarga = arrayTotalHarga.reduce((a, b) => a + b, 0);
  let totalQty = carts.reduce((a, b) => a + b.qty, 0);
  let serviceCharge = 0;
  let discount = 0;

  const handleSubmitOrder = async () => {
    const dataOrderDetails =
      carts &&
      carts.map((val) => ({
        buku_id: val.buku_id,
        title: val.books.title,
        quantity: val.qty,
        price: val.books.harga,
        total: val.books.harga * val.qty,
      }));

    const dataOrder = {
      user_id: uid,
      transaction_id: transactionId,
      total: totalQty,
      total_price: grandTotalHarga,
      orders_detail: dataOrderDetails,
    };

    carts &&
      carts.map((val) => {
        getBookById(val.buku_id);

        if (val.qty > book.stok) {
          enqueueSnackbar(`Maaf! stok buku tidak mencukupi`, {
            variant: "error",
          });
        }

        let dataNewStok = { stok: book.stok - val.qty };
        //console.log(dataNewStok, "data new");
        updateBook(val.buku_id, dataNewStok, user.token);
      });

    createOrder(dataOrder, user.token);
    if (carts) {
      removeCartBulk();
      setIsOrdered(true);
    }
  };

  return (
    <>
      {(tokenDecoded.rli === 2 && tokenDecoded.rln === "member") || isLogin ? (
        <Layout>
          <section className={classes.root}>
            <Container>
              {isOrdered ? (
                <Grid container spacing={3}>
                  <Grid item md={8}>
                    <Alert severity="info" style={{ marginBottom: "10px" }}>
                      <AlertTitle>Order berhasil dilakukan</AlertTitle>
                      No traksaksi anda: {transactionId}, silahkan cek halaman
                      status pemesanan Anda.
                    </Alert>
                    <Alert severity="warning">
                      Ingin berbelanja lagi? silahakan ke halaman pilih buku
                      atau ke{" "}
                      <Link to="/">
                        <strong>halaman home</strong>
                      </Link>
                    </Alert>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item md={7}>
                    {!carts.length ? (
                      <Alert severity="warning">
                        <AlertTitle>Hai, keranjang kamu kosong</AlertTitle>
                        Silahkan kembali ke halaman pilih buku atau ke{" "}
                        <Link to="/">
                          <strong>halaman home</strong>
                        </Link>
                      </Alert>
                    ) : (
                      carts &&
                      carts.map((val) => {
                        return (
                          <>
                            <ListCart
                              key={val.id}
                              listData={val}
                              doAdd={handleAdd}
                              doSubstract={handleSubtract}
                              doRemove={handleRemove}
                            />
                          </>
                        );
                      })
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table}>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                Total Item
                              </Typography>
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell align="right">
                              <Typography
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                {totalQty}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                Service / Discount
                              </Typography>
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell align="right">
                              <Typography
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                {discount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                Summary
                              </Typography>
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell align="right">
                              <Typography
                                className={classes.sumPriceBook}
                                component="h6"
                                variant="h6"
                                color="textSecondary"
                              >
                                {convertToIdr(grandTotalHarga)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box pt={3} className={classes.actionCheckout}>
                      <Button
                        size="large"
                        onClick={() => {
                          history.push("/semua-buku");
                        }}
                      >
                        Kembali Belanja
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleSubmitOrder}
                        disabled={!carts.length ? true : false}
                      >
                        Checkout
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Container>
          </section>
        </Layout>
      ) : (
        history.push("/login")
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartReducer.carts,
    book: state.bookReducer.book,
    user: state.userReducer.user,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id, uid, token) =>
      dispatch(removeFromCart(id, uid, token)),
    substractFromCart: (id, data, token) =>
      dispatch(substractFromCart(id, data, token)),
    addToCart: (data, token) => dispatch(addToCart(data, token)),
    createOrder: (data, token) => dispatch(createOrder(data, token)),
    getBookById: (id) => dispatch(getBookById(id)),
    updateBook: (id, data, token) => dispatch(updateBook(id, data, token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
