import React, { useEffect, Component } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button, Typography, Box, Grid } from "@material-ui/core";
import Layout from "../../templates/layout";
import numeral from "numeral";
import { ENDPOINT } from "../../utils/globals";
import { convertToIdr } from "../../components/functions/convert";
import { getBookById } from "../../store/actions/books";

class DetailBook extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //console.log("test");
    const { match, getBookId } = this.props;
    getBookId(match.params.id);
  }

  render() {
    const { book } = this.props;
    // useEffect(() => {
    //   if (match) {
    //     getBookId(match.params.id);
    //     console.log(match, "match");
    //   }
    // }, [match, getBookId]);

    let imageUrl = book.image_url && book.image_url.replace("public/", "");

    return (
      <Layout>
        <Container>
          <Box mt={5} mb={18}>
            <Grid container spacing={3}>
              <Grid item md={2}>
                <img
                  style={{ width: "100%", height: "auto" }}
                  alt=""
                  src={`${ENDPOINT}/${imageUrl}`}
                />
              </Grid>
              <Grid item md={8}>
                <Box mb={2}>
                  <Typography component="h5" variant="h5">
                    {book.title}
                  </Typography>
                  <Typography component="subtitle1" color="textSecondary">
                    Author: {book.author} || Kategori:{" "}
                    {book.kategori && book.kategori.name}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography component="h6" variant="h6">
                    {convertToIdr(book.harga)}
                  </Typography>
                  <Typography></Typography>
                </Box>
                <Typography component="subtitle1" color="textSecondary">
                  Synopsis :
                </Typography>
                <Typography>{book.synopsis}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.bookReducer.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookId: (id) => dispatch(getBookById(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailBook)
);
