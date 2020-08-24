import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ENDPOINT } from "../../utils/globals";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Dialog,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { convertToIdr } from "../functions/convert";
import FormLogin from "../../auth/login";
import FormRegister from "../../auth/register";
import { addToCart } from "../../store/actions/cart";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  outOfStock: {
    textDecoration: "line-through",
    color: "rgba(0, 0, 0, 0.26)",
  },
}));

const CardBuku = (props) => {
  const [open, setOpen] = useState(false);
  const [authType, setAuthType] = useState("register");
  const { dataCard, user, carts, addToCart, dataLogin, isLogin } = props;
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const userData = user.data ? user.data : "";
  const uid = dataLogin
    ? dataLogin.user.uid
    : user
    ? user.user && user.user.uid
    : "";

  const handleDialogOpen = (authType) => () => {
    setOpen(true);
    setAuthType(authType);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    let obj = {
      user_id: uid,
      buku_id: dataCard.id,
      qty: 1,
    };

    let itemsCart = carts.find((x) => x.buku_id === dataCard.id);
    let qtyOnCart = itemsCart && itemsCart.qty;
    //console.log(itemsCart, "item carts");

    if (itemsCart && qtyOnCart === dataCard.stok) {
      enqueueSnackbar("Maaf, stok buku tidak mencukupi", {
        variant: "error",
      });
    } else {
      addToCart(obj, user.token);

      enqueueSnackbar("Menambahkan ke keranjang", {
        variant: "success",
      });
    }
  };

  let imageUrl = dataCard.image_url.replace("public/", "");

  let title =
    dataCard.title.length > 25
      ? dataCard.title.substring(0, 25) + " ..."
      : dataCard.title;

  let content =
    dataCard.synopsis.length > 100
      ? dataCard.synopsis.substring(0, 100) + " ..."
      : dataCard.synopsis;

  let imgTitle = dataCard.title.replace(" ", "-");

  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${ENDPOINT}/${imageUrl}`}
            title={imgTitle}
          />
          <CardContent>
            <Typography gutterBottom component="h3">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>{dataCard.author}</b>, {content}
            </Typography>
            <Typography>
              <span className={dataCard.stok === 0 ? classes.outOfStock : ""}>
                {convertToIdr(dataCard.harga)}
              </span>{" "}
              <small style={{ color: "red" }}>
                {dataCard.stok === 0 ? "out of stock" : ""}
              </small>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => {
              history.push(`/rincian-buku/${dataCard.id}`);
            }}
          >
            Detail
          </Button>
          {dataLogin || isLogin ? (
            dataCard.stok === 0 ? (
              <Button color="secondary" disabled>
                Add to cart
              </Button>
            ) : (
              <Button color="secondary" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          ) : (
            <>
              {dataCard.stok === 0 ? (
                <Button color="secondary" disabled>
                  Add to cart
                </Button>
              ) : (
                <Button
                  color="secondary"
                  onClick={handleDialogOpen("login")}
                  //onClick={!dataLogin ? handleDialogOpen("login") : ""}
                >
                  Add to cart
                </Button>
              )}

              <Dialog
                fullWidth
                maxWidth={authType === "login" ? "xs" : "xs"}
                open={open}
                onClose={handleDialogClose}
              >
                {authType === "login" ? (
                  <>
                    <FormLogin
                      handleOpen={handleDialogOpen}
                      handleClose={handleDialogClose}
                    />
                  </>
                ) : (
                  <>
                    <FormRegister
                      handleOpen={handleDialogOpen}
                      handleClose={handleDialogClose}
                    />
                  </>
                )}
              </Dialog>
            </>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartReducer.carts,
    user: state.userReducer.user,
    isLogin: state.userReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (data, token) => dispatch(addToCart(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBuku);
