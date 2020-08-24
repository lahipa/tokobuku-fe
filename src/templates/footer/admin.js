import React, { Fragment } from "react";
import { Typography, Box } from "@material-ui/core/";

const AdminFooter = () => {
  return (
    <Box pt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        Crafted with love in Pacitan &copy; {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default AdminFooter;
