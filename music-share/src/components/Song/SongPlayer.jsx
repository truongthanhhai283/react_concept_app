import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import { useQuery } from "@apollo/react-hooks";
import ReactPlayer from "react-player";
import { useMediaQuery } from "@material-ui/core";
import Marquee from "react-fast-marquee";

import { GET_QUEUE_SONG } from "graphql/queries";
import QueueSong from "./QueueSong";
import { SongContext } from "App";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
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
    justifyContent: 'space-between'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  thumbnail: {
    width: 150,
  },
  textWhiteSpace: {
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    overflow: "hidden",
    fontSize: "18px",
  },
  textDuration: {
    marginLeft: '20px'
  }
}));

const SongPlay = () => {
  const { data } = useQuery(GET_QUEUE_SONG);
  const { state, dispatch } = useContext(SongContext);
  const classes = useStyles();
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const reactPlayerRef = useRef();

  const getterToSm = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const songIndex = data?.queue.findIndex(song => song?.id === state?.song?.id)
    setPositionInQueue(songIndex)
  }, [state?.song?.id, data.queue])

  useEffect(() => {
    const nextSong = data?.queue[positionInQueue + 1]
    if (played >= 0.99 && nextSong) {
      setPlayed(0)
      dispatch({ type: "SET_SONG", payload: { song: nextSong } })
    }
  }, [data.queue, played, dispatch, positionInQueue])

  const handleTogglePlay = () => {
    dispatch(state?.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekingMouseDown = () => {
    setSeeking(true);
    reactPlayerRef.current.seekTo(played);
  };

  const handleSeekingMouseUp = () => {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  };

  const handlePlayPrevSong = () => {
    const prevSong = data.queue[positionInQueue - 1]

    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } })
    }
  }

  const handlePlayNextSong = () => {
    const nextSong = data?.queue[positionInQueue + 1]
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } })
    }
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details} style={{ width: getterToSm && '100%' }}>
          <CardContent className={classes.content} style={{ textAlign: getterToSm && "center" }}>
            {getterToSm && state?.isPlaying ? (
              <Marquee style={{ fontSize: '18px' }}>
                {state?.song?.title}
              </Marquee>
            ) : (
              <Typography variant="h5" component="h3" className={classes.textWhiteSpace}>
                {state?.song?.title}
              </Typography>
            )}

            <Typography variant="subtitle1" component="p" color="textSecondary" style={{
              display: getterToSm && "none",
            }}>
              {state?.song?.artist}
            </Typography>
          </CardContent>

          <div className={classes.controls} style={{ textAlign: getterToSm && "center", justifyContent: getterToSm && "space-evenly" }}>
            <div>
              <IconButton onClick={handlePlayPrevSong}>
                <SkipPrevious />
              </IconButton>

              <IconButton onClick={handleTogglePlay}>
                {state?.isPlaying ? (
                  <Pause className={classes.playIcon} />
                ) : (
                  <PlayArrow className={classes.playIcon} />
                )}
              </IconButton>

              <IconButton onClick={handlePlayNextSong}>
                <SkipNext />
              </IconButton>

            </div>
            <Typography variant="subtitle1" component="p" color="textSecondary" className={classes.textDuration}>
              {formatDuration(playedSeconds)}
            </Typography>
          </div>

          <Slider
            aria-labelledby="continuous-slider"
            value={played}
            onChange={handleProgressChange}
            onMouseDown={handleSeekingMouseDown}
            onMouseUp={handleSeekingMouseUp}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state?.song?.url}
          playing={state.isPlaying}
          hidden
        />

        <CardMedia
          image={state?.song?.thumbnail}
          className={classes.thumbnail}
          style={{
            display: getterToSm && "none"
          }}
        />
      </Card>
      <QueueSong queueList={data?.queue} />
    </>
  );
};

export default SongPlay;
