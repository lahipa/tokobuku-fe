import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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
  Typography,
  Tooltip,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EditRounded from "@material-ui/icons/EditRounded";
import { getMonthFormatSmall } from "../../../../components/functions/convert";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const ListComponent = (props) => {
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { no, key, listData, doUpdate, doDelete, classes } = props;

  useEffect(() => {
    if (listData) {
      setData({
        name: listData.name,
        username: listData.username,
        email: listData.email,
      });
    }
  }, [listData]);

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

  let createdTime = new Date(listData.created_at);
  let updatedTime = new Date(listData.updated_at);

  return (
    <Fragment>
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          <Typography variant="body2">
            {createdTime.getDate()}-
            {getMonthFormatSmall(createdTime.getMonth())}-
            {createdTime.getFullYear()},{" "}
            {`${createdTime.getHours()}:${createdTime.getMinutes()}`}
          </Typography>
        </TableCell>
        <TableCell>
          <HtmlTooltip
            title={
              <Fragment>
                <Typography color="inherit">User Update</Typography>
                <em>{"Data user diupdate"}</em> <b>{"atau"}</b>{" "}
                <em>{"saat user di buat"}</em>.
              </Fragment>
            }
          >
            <Typography variant="body2" color="textSecondary">
              {updatedTime.getDate()}-
              {getMonthFormatSmall(updatedTime.getMonth())}-
              {updatedTime.getFullYear()},{" "}
              {`${updatedTime.getHours()}:${updatedTime.getMinutes()}`}
            </Typography>
          </HtmlTooltip>
        </TableCell>
        <TableCell>{listData.name}</TableCell>
        <TableCell>{listData.username}</TableCell>
        <TableCell>{listData.email}</TableCell>
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
          {/* 
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(listData.id)}
          >
            <DeleteIcon />
          </IconButton> */}
        </TableCell>
      </TableRow>

      {edit ? (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Name</InputLabel>
                  <Input
                    value={data.name}
                    onChange={(e) => handleForm(e, "name")}
                    placeholder=""
                  />
                  <FormHelperText>Maksimum karakter 255</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Username</InputLabel>
                  <Input
                    value={data.username}
                    onChange={(e) => handleForm(e, "username")}
                    placeholder=""
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel shrink>Email</InputLabel>
                  <Input
                    value={data.email}
                    onChange={(e) => handleForm(e, "email")}
                    placeholder=""
                  />
                  <FormHelperText>info@email.com</FormHelperText>
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
                  username: listData.username,
                  email: listData.email,
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
