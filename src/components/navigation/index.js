import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    //backgroundColor: "#fff",
  },
  toolbarSecondary: {
    display: "inline-flex",
    overflowX: "auto",
    flexWrap: "wrap",
    gap: "30px",
    "& a": {
      textDecoration: "none",
      //color: "inherit",
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  },
  toolbarLink: {},
}));

const MainMenu = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container>
          <Toolbar
            component="nav"
            variant="dense"
            className={classes.toolbarSecondary}
          >
            {/* MuiButton-textPrimary */}
            <Link
              className={`MuiButtonBase-root MuiButton-root MuiButton-text `}
              to="/semua-buku"
            >
              Semua Koleksi
            </Link>
            <Link
              className={`MuiButtonBase-root MuiButton-root MuiButton-text `}
              to="/buku-baru"
            >
              Buku Baru
            </Link>
            <Link
              className={`MuiButtonBase-root MuiButton-root MuiButton-text `}
              to="/best-seller"
            >
              Best Seller
            </Link>
            <Link
              className={`MuiButtonBase-root MuiButton-root MuiButton-text `}
              to="/buku-import"
            >
              Buku Import
            </Link>
            <Link
              className={`MuiButtonBase-root MuiButton-root MuiButton-text `}
              to="/buku-memasak"
            >
              Memasak
            </Link>
          </Toolbar>
        </Container>
      </Toolbar>
    </Fragment>
  );
};

export default MainMenu;
