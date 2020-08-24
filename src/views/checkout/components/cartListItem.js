import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteSweep from "@material-ui/icons/DeleteSweep";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import AddCircle from "@material-ui/icons/AddCircle";
import { convertToIdr } from "../../../components/functions/convert";
import { ENDPOINT } from "../../../utils/globals";
import { getBookById } from "../../../store/actions/books";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  details: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  cover: {
    flex: 1,
    maxwidth: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  sideColums: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  price: {
    paddingTop: theme.spacing(2),
  },
  sumPriceBook: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

const ListCart = (props) => {
  //const [data, setData] = useState({});
  const { listData, doAdd, doSubstract, doRemove, book, getBook } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (listData) {
      getBook(listData.buku_id);
    }
  }, [listData]);

  let obj = {
    user_id: listData.user_id,
    buku_id: listData.buku_id,
    qty: 1,
  };

  const handleAdd = () => {
    //console.log(data, "data add");
    if (listData.qty === book.stok) {
      enqueueSnackbar("Maaf, stok buku tidak mencukupi", {
        variant: "error",
      });
    } else {
      doAdd(obj);
    }
  };

  const handleSubtract = (id) => {
    //console.log(data, "data substract");
    doSubstract(id, obj);
  };

  const handleRemove = (id) => {
    doRemove(id);
  };

  let imageUrl = listData.books.image_url.replace("public/", "");
  let sumPrice = listData.books.harga * listData.qty;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`${ENDPOINT}/${imageUrl}`}
        title={listData.books.title.toLowerCase().replace(" ", "-")}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {listData.books.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {listData.books.author}
          </Typography>
          <Typography className={classes.price} component="h6" variant="h6">
            {convertToIdr(listData.books.harga)}
          </Typography>
        </CardContent>
        <div className={classes.sideColums}>
          <Typography
            className={classes.sumPriceBook}
            component="h6"
            variant="h6"
            color="textSecondary"
          >
            {convertToIdr(sumPrice)}
          </Typography>
          <div className={classes.controls}>
            <IconButton
              onClick={() => {
                handleRemove(listData.id);
              }}
            >
              <DeleteSweep fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleSubtract(listData.id);
              }}
            >
              <RemoveCircle />
            </IconButton>
            {listData.qty}
            <IconButton onClick={handleAdd}>
              <AddCircle />
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    book: state.bookReducer.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (id) => dispatch(getBookById(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListCart)
);
