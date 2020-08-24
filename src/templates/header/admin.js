import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Avatar,
  Drawer,
  Menu,
  MenuItem,
  List,
  Divider,
  Box,
  IconButton,
  Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  mainNavigationItems,
  secondNavigationItems,
} from "../../admin/components/navigation";
import { handleLogout } from "../../admin/auth/logout";
import { getNotification } from "../../store/actions/orders";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

const AdminHeader = (props) => {
  const { match, notif, getNotification } = props;
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (match) {
      getNotification({ proceed: 0 });
      setInterval(async () => {
        getNotification({ proceed: 0 });
      }, 30000);
    }
  }, [match]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.title}>
            <Link
              to={notif ? "/imcoolmaster/orders" : "#"}
              style={{ color: "#fff" }}
            >
              <IconButton color="inherit">
                {notif ? (
                  <Badge badgeContent={notif} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                ) : (
                  <NotificationsIcon />
                )}
              </IconButton>
            </Link>
          </Box>

          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List component="nav">{mainNavigationItems}</List>
        <Divider />
        <List component="nav">{secondNavigationItems}</List>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notif: state.orderReducer.notif,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (params) => dispatch(getNotification(params)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
