import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { TableCell, TableRow, IconButton, Chip } from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import {
  getMonthFormatSmall,
  convertToIdr,
} from "../../../../components/functions/convert";

const ListComponent = (props) => {
  const { no, key, listData } = props;

  let discount = 0;
  let purchasedPrice = listData.total_price - discount;
  let dataTime = new Date(listData.created_at);
  return (
    <Fragment>
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {dataTime.getDate()}-{getMonthFormatSmall(dataTime.getMonth())}-
          {dataTime.getFullYear()},{" "}
          {`${dataTime.getHours()}:${dataTime.getMinutes()}`}
        </TableCell>
        <TableCell>{listData.customers_detail.name}</TableCell>
        <TableCell>{listData.customers_detail.email}</TableCell>
        <TableCell align="right">{listData.total}</TableCell>
        <TableCell align="center">
          {listData.proceed ? (
            <Chip label="Proceed" color="primary" />
          ) : (
            <Chip label="Pending" color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          {convertToIdr(listData.total_price)}
        </TableCell>
        <TableCell align="center">
          <Link to={`/imcoolmaster/orders/${listData.id}`}>
            <IconButton color="primary" aria-label="edit">
              <EditRounded />
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default withRouter(ListComponent);
