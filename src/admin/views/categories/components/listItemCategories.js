import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import { getMonthFormatSmall } from "../../../../components/functions/convert";

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
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const { no, key, listData, doUpdate, doDelete } = props;

  const classes = useStyles();

  useEffect(() => {
    if (listData) {
      setData({
        name: listData.name,
      });
    }
  }, [listData]);

  const handleUpdate = (id) => {
    console.log(data, "data");
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
    console.log(data, "data kategori");
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
        <TableCell component="th" scope="row">
          {listData.name}
        </TableCell>
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
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
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
