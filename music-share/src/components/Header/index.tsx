import React, { useEffect, useState } from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Tooltip,
  Box,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { HeadsetTwoTone } from "@material-ui/icons";

import { useDate } from "../../getDay";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2), // ~ '8px'
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Header = () => {
  const { date, time, wish } = useDate();

  const classes = useStyles();
  return (
    <AppBar color="secondary" position="fixed">
      <Toolbar className={classes.toolbar}>
        <HeadsetTwoTone />
        <div className={classes.left}>
          <Typography className={classes.title} variant="h6" component="h1">
            {wish}
          </Typography>
          <span>
            {date}, {time}
          </span>
        </div>

        <Box sx={{ flexGrow: 0 }}>
          <p>Trương Thanh Hải</p>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
