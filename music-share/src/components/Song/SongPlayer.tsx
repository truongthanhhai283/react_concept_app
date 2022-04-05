import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import { PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";

import QueueSong from "./QueueSong";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  thumbnail: {
    width: 150,
  },
}));

const SongPlay = () => {
  const classes = useStyles();

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>

            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>

          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>

            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>

            <IconButton>
              <SkipNext />
            </IconButton>

            <Typography variant="subtitle1" component="p" color="textSecondary">
              00 :01: 30
            </Typography>
          </div>

          <Slider />
        </div>
        <CardMedia
          image="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/03/Earbuds-against-heart-background.jpg"
          className={classes.thumbnail}
        />
      </Card>
      <QueueSong />
    </>
  );
};

export default SongPlay;
