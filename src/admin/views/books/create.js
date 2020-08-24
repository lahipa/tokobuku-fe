import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
  Select,
  FormHelperText,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import { getListKategori } from "../../../store/actions/categories";

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

const AddBooks = (props) => {
  const [data, setData] = useState({});
  const [image_url, setImage] = useState("");
  // const [kategori_id, setKategori] = useState("");
  // const [title, setTitle] = useState("");
  // const [harga, setHarga] = useState("");
  // const [author, setAuthor] = useState("");
  // const [no_isbn, setIsbn] = useState("");
  // const [berat, setBerat] = useState("");
  // const [synopsis, setSynopsis] = useState("");
  const { doAdd, open, handleClose, categories, getKategori } = props;

  const classes = useStyles();

  useEffect(() => {
    if (open) {
      getKategori();
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    doAdd(formData);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
    // console.log(data, "From dashboard");
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Add Books</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={3}>
            <Grid item md={4} lg={3}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel shrink id="select-category">
                  Category
                </InputLabel>
                <Select
                  labelId="select-category"
                  id="demo-simple-select"
                  displayEmpty
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
              <TextField
                required
                label="Title"
                placeholder="ex: Kambing Jantan Mencari Mangsa"
                helperText="Maksimum karakter 255"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={(e) => setTitle(e.target.value)}
                onChange={(e) => handleForm(e, "title")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md>
              <TextField
                required
                label="Harga"
                type="number"
                helperText="Only number!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">IDR</InputAdornment>
                  ),
                }}
                //onChange={(e) => setHarga(e.target.value)}
                onChange={(e) => handleForm(e, "harga")}
              />
            </Grid>
            <Grid item md>
              <TextField
                required
                label="Penulis"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={(e) => setAuthor(e.target.value)}
                onChange={(e) => handleForm(e, "author")}
              />
            </Grid>
            <Grid item md>
              <TextField
                required
                label="ISBN"
                placeholder="ex: AB3033"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={(e) => setIsbn(e.target.value)}
                onChange={(e) => handleForm(e, "no_isbn")}
              />
            </Grid>
            <Grid item md>
              <TextField
                required
                placeholder="ex: 33"
                helperText="Berat buku"
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">g</InputAdornment>
                  ),
                }}
                className={classes.withoutLabel}
                //onChange={(e) => setBerat(e.target.value)}
                onChange={(e) => handleForm(e, "berat")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={2}>
              <TextField
                label="Stok"
                type="number"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={(e) => setHarga(e.target.value)}
                onChange={(e) => handleForm(e, "stok")}
              />
            </Grid>
            <Grid item md={3} lg={2}>
              <div className={classes.withoutLabel}>
                <input
                  type="file"
                  id="upload-file"
                  accept="image/*"
                  multiple
                  className={classes.inputFile}
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
              <span>{image_url.name}</span>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                required
                label="Synopsis"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                //onChange={(e) => setSynopsis(e.target.value)}
                onChange={(e) => handleForm(e, "synopsis")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" type="submit" startIcon={<SaveIcon />}>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
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
  connect(mapStateToProps, mapDispatchToProps)(AddBooks)
);
