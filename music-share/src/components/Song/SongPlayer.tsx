import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Slider,
  Typography,
} from "@material-ui/core";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import { useQuery } from "@apollo/react-hooks";

import { GET_QUEUE_SONG } from "graphql/queries";
import QueueSong from "./QueueSong";
import { SongContext } from "App";

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
  const { data } = useQuery(GET_QUEUE_SONG);
  const { state, dispatch } = useContext(SongContext);
  const classes = useStyles();

  const handleTogglePlay = () => {
    dispatch(state?.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  console.log("data",data);
  

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state?.song?.title}
            </Typography>

            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state?.song?.artist}
            </Typography>
          </CardContent>

          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>

            <IconButton onClick={handleTogglePlay}>
              {state?.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
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
          image={state?.song?.thumbnail}
          className={classes.thumbnail}
        />
      </Card>
      <QueueSong queueList={data?.queue} />
    </>
  );
};

export default SongPlay;
