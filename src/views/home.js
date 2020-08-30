import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../templates/layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Toolbar,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";
import { dataLogin } from "../utils/globals";
import { getListBook } from "../store/actions/books";
import CardBuku from "../components/card/cardBuku";

//Carousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  containerTagline: {
    minHeight: "48px !important",
    backgroundColor: "#fff",
    position: "relative",
  },
  toolbarSecondary: {
    display: "inline-flex",
    overflowX: "auto",
    flexWrap: "wrap",
    gap: "30px",
    "& *": {
      textDecoration: "none",
      //color: "inherit",
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  },
  sectionTitle: {
    textAlign: "center",
  },
}));

const Home = (props) => {
  const { match, books, getBook } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getBook();
    }
  }, [match]);

  const handleOnDragStart = (e) => e.preventDefault();

  const isPrime = (num) => {
    if (num < 2) {
      return false;
    }

    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  };

  let prime = [];
  for (let i = 0; i < 100; i++) {
    if (isPrime(i)) {
      prime.push(i);
    }
  }
  console.log(prime);

  return (
    <Layout>
      <Toolbar className={classes.containerTagline}>
        <Container>
          <Toolbar variant="dense" className={classes.toolbarSecondary}>
            <span>Produk Original & Terjamin</span>
            <span>Gratis Pengiriman</span>
            <span>Gratis Pengembalian</span>
          </Toolbar>
        </Container>
      </Toolbar>

      <AliceCarousel
        autoPlay
        autoPlayInterval="3000"
        mouseTrackingEnabled
        buttonsDisabled
      >
        <img
          src="../../asset/slider/bbc-slider-1.png"
          onDragStart={handleOnDragStart}
          className="sliderimg"
        />
        <img
          src="../../asset/slider/bbc-slider-2.jpg"
          onDragStart={handleOnDragStart}
          className="sliderimg"
        />
        <img
          src="../../asset/slider/bbc-slider-3.jpg"
          onDragStart={handleOnDragStart}
          className="sliderimg"
        />
      </AliceCarousel>

      <Box>
        <Container>
          <Box pt={10} pb={6} className={classes.sectionTitle}>
            <Typography variant="h5" center component="h3">
              Buku Terbaru {new Date().getFullYear()}
            </Typography>
            <Typography component="subtitle1">
              Temukan Buku Terlaris di Tahun {new Date().getFullYear()} dengan
              harga Terbaik{" "}
            </Typography>
          </Box>
          <Box pb={20}>
            <Grid container spacing={3}>
              {books.rows && books.rows.length !== 0
                ? books.rows?.slice(0, 8).map((val) => {
                    return (
                      <Grid item lg={3}>
                        <CardBuku
                          dataCard={val}
                          key={val.id}
                          dataLogin={dataLogin}
                        />
                      </Grid>
                    );
                  })
                : Array(8)
                    .fill()
                    .map((_) => (
                      <Grid item lg={3}>
                        <Skeleton variant="rect" width="100%" height={163.13} />
                        <Box pt={0.5}>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Grid>
                    ))}
            </Grid>
          </Box>
        </Container>
      </Box>
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
    getBook: () => dispatch(getListBook()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
