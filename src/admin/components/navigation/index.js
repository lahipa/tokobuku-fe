import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core/";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircle from "@material-ui/icons/AccountCircle";

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export const mainNavigationItems = (
  <div>
    <ListItemLink
      to="/imcoolmaster/dashboard"
      icon={<DashboardIcon />}
      primary="Dashboard"
    />
    <ListItemLink
      to="/imcoolmaster/orders"
      icon={<ShoppingCartIcon />}
      primary="Orders"
    />
    <ListItemLink
      to="/imcoolmaster/customers"
      icon={<PeopleIcon />}
      primary="Customers"
    />
    <ListItemLink to="#" icon={<BarChartIcon />} primary="Reports" />
  </div>
);

export const secondNavigationItems = (
  <div>
    <ListSubheader inset>Manage Store</ListSubheader>
    <ListItemLink
      to="/imcoolmaster/books-list"
      icon={<LayersIcon />}
      primary="Books"
    />
    <ListItemLink
      to="/imcoolmaster/books-category"
      icon={<AssignmentIcon />}
      primary="Category"
    />
    <ListItemLink
      to="/imcoolmaster/admins"
      icon={<AccountCircle />}
      primary="Admin"
    />
  </div>
);
