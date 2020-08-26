import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../templates/layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CardBuku from "../../components/card/cardBuku";
import { getListBook } from "../../store/actions/books";
import { dataLogin } from "../../utils/globals";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const AllBook = (props) => {
  const { match, books, getBook } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getBook();
    }
  }, [match]);

  return (
    <Layout>
      <Container>
        <Box pt={5} pb={6} className={classes.sectionTitle}>
          <Typography variant="h5" center component="h3">
            Semua Koleksi Buku
          </Typography>
          <Typography component="subtitle1" color="textSecondary">
            Temukan buku yang kamu cari di sini, harga menarik
          </Typography>
        </Box>
        <Box pb={20}>
          <Grid container spacing={3}>
            {books.rows && books.rows.length !== 0 ? (
              books.rows &&
              books.rows.map((val) => {
                return (
                  <Grid item lg={3} key={val.id}>
                    <CardBuku dataCard={val} dataLogin={dataLogin} />
                  </Grid>
                );
              })
            ) : (
              <Box>
                <Alert severity="info">
                  <AlertTitle>Barang kosong?</AlertTitle>
                  <p style={{ lineHeight: "1.5" }}>
                    Maaf sekali jika kamu melihat halaman ini tidak ada buku
                    yang tertampil, hal ini bukan karena kesalahan sistem hanya
                    saja mungkin stok barang untuk penjualan online sedang
                    kosong. Kunjungi kembali situs kami dilain waktu.
                  </p>
                </Alert>
              </Box>
            )}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (params) => dispatch(getListBook(params)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllBook)
);
