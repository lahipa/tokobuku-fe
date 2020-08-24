import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import Layout from "../../../templates/layout/adminlayout";
import { makeStyles } from "@material-ui/core/styles";
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
  TableSortLabel,
  Fab,
  Typography,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import AddBook from "./create";
import TableDataShow from "./components/listItemBooks";
import { dataLogin } from "../../../utils/globals";
import {
  getListBook,
  addBook,
  updateBook,
  deleteBook,
} from "../../../store/actions/books";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

const Books = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortType, setSortType] = useState("DESC");
  const [relate, setRelate] = useState("");
  const [open, setOpen] = useState(false);
  const { match, books, getBook, addBook, updateBook, deleteBook } = props;

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getBook({
        limit: limit,
        page: page,
        sort_by: sortBy,
        sort_type: sortType,
        relate: relate,
      });
    }
  }, [match, limit, page, sortBy, sortType, relate]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  const handleSubmit = (data) => {
    addBook(data);
  };

  const handleUpdate = (id, updateData) => {
    updateBook(id, updateData);
  };

  const handleDelete = (id) => {
    deleteBook(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const jmlPage = Math.ceil(books.count / books.limit);
  let i = 1;

  const handleChangePage = (e, val) => {
    setPage(val);
  };

  const handleSort = (val, relate) => {
    const isAsc = sortBy === val && sortType === "ASC";

    setSortType(isAsc ? "DESC" : "ASC");
    setSortBy(val);
    setRelate(relate);
  };

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h5">Books</Typography>
        <Typography variant="subtitle">
          Create, update, delete books data.{" "}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "created_at"}
                      direction={sortType.toLowerCase()}
                      onClick={() => {
                        handleSort("created_at");
                      }}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "title"}
                      direction={
                        sortBy === "title" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("title");
                      }}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "author"}
                      direction={
                        sortBy === "author" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("author");
                      }}
                    >
                      Author
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={
                        sortBy === "name" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("name", "kategori");
                      }}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === "stock"}
                      direction={
                        sortBy === "stock" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("stock");
                      }}
                    >
                      Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === "harga"}
                      direction={
                        sortBy === "harga" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("harga");
                      }}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books ? (
                  books.rows &&
                  books.rows.map((val) => {
                    return (
                      <TableDataShow
                        no={i++}
                        key={val.id}
                        listData={val}
                        doUpdate={handleUpdate}
                        doDelete={handleDelete}
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
          </TableContainer>
        </Grid>
      </Grid>
      <Box pt={5} pr={5}>
        <Grid container spacing={3} justify="flex-end" alignItems="center">
          <Typography>Rows per page:</Typography>
          <Box pl={2} pr={3}>
            <TextField
              select
              className={classes.select}
              InputProps={{ classes }}
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="25">25</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </TextField>
          </Box>

          <Pagination
            count={jmlPage}
            page={page}
            boundaryCount={3}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Box>

      <Fab
        color="secondary"
        className={classes.fab}
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <AddBook
        classes={classes}
        doAdd={handleSubmit}
        open={open}
        handleClose={handleClose}
      />
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
    addBook: (data) => dispatch(addBook(data)),
    updateBook: (id, data) => dispatch(updateBook(id, data)),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books));
