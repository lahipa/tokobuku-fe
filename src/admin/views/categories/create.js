import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

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

const AddCategories = (props) => {
  const [data, setData] = useState({});
  const { doAdd, open, handleClose } = props;

  const classes = useStyles();

  const handleSubmit = (e) => {
    //e.preventDefault();
    handleClose();
    doAdd(data);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
    //console.log(data, "From kategori");
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Add Categories</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent className={classes.dialogContent}>
          <Grid container spacing={3}>
            <Grid item md={5} lg={4}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel shrink>Kategori Name</InputLabel>
                <Input onChange={(e) => handleForm(e, "name")} placeholder="" />
                <FormHelperText>Maksimum karakter 255</FormHelperText>
              </FormControl>
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

export default withRouter(AddCategories);
