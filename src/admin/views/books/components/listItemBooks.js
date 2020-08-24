import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Select,
  FormHelperText,
  Button,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRounded from "@material-ui/icons/EditRounded";
import { getListKategori } from "../../../../store/actions/categories";
import {
  getMonthFormatSmall,
  convertToIdr,
} from "../../../../components/functions/convert";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
  inputFile: {
    display: "none",
  },
  dialogContent: {
    overflowY: "hidden",
  },
}));

const ListComponent = (props) => {
  const [data, setData] = useState({});
  const [image_url, setImage] = useState("");
  // const [kategori_id, setKategori] = useState("");
  // const [title, setTitle] = useState("");
  // const [harga, setHarga] = useState("");
  // const [author, setAuthor] = useState("");
  // const [no_isbn, setIsbn] = useState("");
  // const [berat, setBerat] = useState("");
  // const [synopsis, setSynopsis] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const {
    no,
    key,
    listData,
    doUpdate,
    doDelete,
    categories,
    getKategori,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    if (listData) {
      setData({
        kategori_id: listData.kategori_id,
        title: listData.title,
        harga: listData.harga,
        author: listData.author,
        no_isbn: listData.no_isbn,
        berat: listData.berat,
        stok: listData.stok,
        synopsis: listData.synopsis,
      });
    }
  }, [listData]);

  useEffect(() => {
    if (open) {
      getKategori();
    }
  }, [open]);

  const handleUpdate = (id) => {
    //e.preventDefault();
    const formData = new FormData();
    formData.append("kategori_id", data.kategori_id);
    formData.append("title", data.title);
    formData.append("harga", data.harga);
    formData.append("author", data.author);
    formData.append("image_url", image_url);
    formData.append("no_isbn", data.no_isbn);
    formData.append("berat", data.berat);
    formData.append("stok", data.stok);
    formData.append("synopsis", data.synopsis);

    handleClose();
    setEdit(false);
    doUpdate(id, formData);
  };

  const handleDelete = (id) => {
    doDelete(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  let createdTime = new Date(listData.created_at);

  return (
    <Fragment>
      <TableRow key={key}>
        <TableCell>
          {createdTime.getDate()}-{getMonthFormatSmall(createdTime.getMonth())}-
          {createdTime.getFullYear()},{" "}
          {`${createdTime.getHours()}:${createdTime.getMinutes()}`}
        </TableCell>
        <TableCell>{listData.title}</TableCell>
        <TableCell>{listData.author}</TableCell>
        <TableCell>{listData.kategori && listData.kategori.name}</TableCell>
        {/* <TableCell align="center">{listData.no_isbn}</TableCell> */}
        {/* <TableCell align="right">{`${listData.berat} gram`}</TableCell> */}
        <TableCell align="right">{listData.stok}</TableCell>
        <TableCell align="right">{convertToIdr(listData.harga)}</TableCell>
        <TableCell align="center">
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => {
              setEdit(true);
              handleOpen();
            }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(listData.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {edit ? (
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle>Edit Buku</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={3}>
              <Grid item md={4} lg={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink id="select-category">
                    Category
                  </InputLabel>
                  <Select
                    labelId="select-category"
                    id="demo-simple-select"
                    value={data.kategori_id}
                    //onChange={(e) => setKategori(e.target.value)}
                    onChange={(e) => handleForm(e, "kategori_id")}
                  >
                    <MenuItem>Pilih</MenuItem>
                    {categories.rows &&
                      categories.rows.map((val) => {
                        return (
                          <MenuItem key={val.id} value={val.id}>
                            {val.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>Pengelompokan buku</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item md lg>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Title</InputLabel>
                  <Input
                    value={data.title}
                    //onChange={(e) => setTitle(e.target.value)}
                    onChange={(e) => handleForm(e, "title")}
                    placeholder=""
                  />
                  <FormHelperText>Maksimum karakter 255</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Harga</InputLabel>
                  <Input
                    value={data.harga}
                    //onChange={(e) => setHarga(e.target.value)}
                    onChange={(e) => handleForm(e, "harga")}
                    type="number"
                    placeholder=""
                    startAdornment={
                      <InputAdornment position="start">IDR</InputAdornment>
                    }
                  />
                  <FormHelperText>Only number!</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item md>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Penulis</InputLabel>
                  <Input
                    value={data.author}
                    //onChange={(e) => setAuthor(e.target.value)}
                    onChange={(e) => handleForm(e, "author")}
                    placeholder=""
                  />
                </FormControl>
              </Grid>
              <Grid item md>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>No. ISBN</InputLabel>
                  <Input
                    value={data.no_isbn}
                    //onChange={(e) => setIsbn(e.target.value)}
                    onChange={(e) => handleForm(e, "no_isbn")}
                    placeholder=""
                  />
                </FormControl>
              </Grid>
              <Grid item md>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Berat</InputLabel>
                  <Input
                    value={data.berat}
                    //onChange={(e) => setBerat(e.target.value)}
                    onChange={(e) => handleForm(e, "berat")}
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">gr</InputAdornment>
                    }
                    placeholder="ex: 33"
                  />
                  <FormHelperText>Berat buku</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={2}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Stok</InputLabel>
                  <Input
                    value={data.stok}
                    onChange={(e) => handleForm(e, "stok")}
                    type="number"
                    placeholder=""
                  />
                </FormControl>
              </Grid>
              <Grid item md={2} lg={2}>
                <div className={classes.withoutLabel}>
                  <input
                    type="file"
                    id="upload-file"
                    accept="image/*"
                    multiple
                    className={classes.inputFile}
                    value=""
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  <label htmlFor="upload-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      Cover
                    </Button>
                  </label>
                </div>
              </Grid>
              <Grid item md lg>
                <span>
                  {image_url ? image_url.name : listData.image_url.substr(21)}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Synopsis</InputLabel>
                  <Input
                    value={data.synopsis}
                    //onChange={(e) => setSynopsis(e.target.value)}
                    onChange={(e) => handleForm(e, "synopsis")}
                    multiline
                    placeholder=""
                  />
                  <FormHelperText>Maksimum 255 kata</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setData({
                  kategori_id: listData.kategori_id,
                  title: listData.title,
                  harga: listData.harga,
                  author: listData.author,
                  no_isbn: listData.no_isbn,
                  berat: listData.berat,
                  synopsis: listData.synopsis,
                  stok: listData.stok,
                });
                //setImage(listData.image_url);
              }}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              type="submit"
              startIcon={<SaveIcon />}
              onClick={() => handleUpdate(listData.id)}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: () => dispatch(getListKategori()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListComponent)
);
