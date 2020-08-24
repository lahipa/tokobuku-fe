import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
    boxShadow: "0 -2px 15px -2px rgba(0,0,0,.25)",
  },
  footerLink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="body1">
          BBC book, Crafted with love in Pacitan.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Link className={classes.footerLink} to="/">
            bacabacacuy.com
          </Link>{" "}
          &copy; {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </footer>
  );
}
