import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRounded from "@material-ui/icons/EditRounded";

const ListComponent = (props) => {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { no, key, listData, doUpdate, doDelete, classes } = props;

  useEffect(() => {
    // setData({
    //   name: listData.name,
    // });
  }, []);

  const handleUpdate = (id) => {
    setEdit(false);
    handleClose();
    doUpdate(id, data);
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

  return (
    <Fragment>
      <TableRow key={key}>
        <TableCell>{no}</TableCell>
        <TableCell component="th" scope="row">
          {listData.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {listData.username}
        </TableCell>
        <TableCell component="th" scope="row">
          {listData.email}
        </TableCell>
        <TableCell align="center">
          {/* <IconButton
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
          </IconButton> */}
        </TableCell>
      </TableRow>

      {edit ? (
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleOpen}>
          <DialogTitle>Edit Buku</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={3}>
              <Grid item md={5} lg={4}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel shrink>Kategori Name</InputLabel>
                  <Input
                    value={data.name}
                    onChange={(e) => handleForm(e, "name")}
                    placeholder=""
                  />
                  <FormHelperText>Maksimum karakter 255</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setEdit(false);
                setData({
                  name: listData.name,
                });
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

export default withRouter(ListComponent);
