import React, { useState, useEffect } from "react";
import { history, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
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
import AddCategory from "./create";
import TableDataShow from "./components/listItemCategories";
import { dataLogin } from "../../../utils/globals";
import {
  getListKategori,
  updateKategori,
  deleteKategori,
  addKategori,
} from "../../../store/actions/categories";

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

const Category = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortType, setSortType] = useState("DESC");
  const [open, setOpen] = useState(false);
  const {
    match,
    categories,
    getKategori,
    updateKategori,
    deleteKategori,
    addKategori,
  } = props;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getKategori({
        limit: limit,
        page: page,
        sort_by: sortBy,
        sort_type: sortType,
      });
    }
  }, [match, limit, page, sortBy, sortType]);

  if (!dataLogin || dataLogin.user.role !== "admin") {
    history.push("/imcoolmaster");
  }

  const handleSubmit = (data) => {
    addKategori(data);
  };

  const handleUpdate = (id, updateData) => {
    console.log(updateData, "parent data");
    updateKategori(id, updateData);
  };

  const handleDelete = (id) => {
    deleteKategori(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const jmlPage = Math.ceil(categories.count / categories.limit);
  let i = 1;

  const handleChangePage = (e, val) => {
    setPage(val);
  };

  const handleSort = (val) => {
    const isAsc = sortBy === val && sortType === "ASC";

    setSortType(isAsc ? "DESC" : "ASC");
    setSortBy(val);
  };

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h5">Categories</Typography>
        <Typography variant="subtitle">
          Create, update, delete categories data.{" "}
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
                      active={sortBy === "name"}
                      direction={
                        sortBy === "name" ? sortType.toLowerCase() : "asc"
                      }
                      onClick={() => {
                        handleSort("name");
                      }}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.rows && categories.rows.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colspan="7">
                      <h5 style={{ fontSize: "16px", color: "#888" }}>
                        <i>Belum ada data tersimpan!</i>
                      </h5>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.rows &&
                  categories.rows.map((val) => {
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
      <AddCategory
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
    categories: state.categoryReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: (params) => dispatch(getListKategori(params)),
    updateKategori: (id, data) => dispatch(updateKategori(id, data)),
    deleteKategori: (id) => dispatch(deleteKategori(id)),
    addKategori: (data) => dispatch(addKategori(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
