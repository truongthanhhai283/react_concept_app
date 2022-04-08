import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import Marquee from "react-fast-marquee";
import clsx from "clsx";

import { SongType } from "../../type";
import { Pause, PlayArrow, Save } from "@material-ui/icons";
import { GET_SONGS } from "../../graphql/subscription";
import { SongContext } from "App";
import { ADD_OR_REMOVE_QUEUE } from "graphql/mutation";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  songThumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
  textWhiteSpace: {
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    overflow: "hidden",
    fontSize: "18px",
  },
  songContentCurrentPlaying: {
    backgroundColor: "#e9f3f7",
    color: "rgba(0,0,0,0.88)",
  },
  songPlayingColorArtist: {
    color: "rgba(0,0,0,0.5)",
  },
  songPlayingColorArtistPurple: {
    color: "#d500f9",
  },
}));

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error) {
    return <div>Error fetching list...</div>;
  }
  return (
    <div>
      {data?.table_songs?.map((song: SongType) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

const Song = ({ song }: any) => {
  const classes = useStyles();
  const { id, title, thumbnail, artist } = song;
  const { state, dispatch } = useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state?.song?.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  const handleTogglePlay = () => {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state?.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleAddOrRemoveToQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: {
          ...song,
          __typename: "Song", //type Song in typedefs in client.js
        },
      },
    });
  };

  return (
    <Card className={classes.container}>
      <div
        className={clsx(
          classes.songInfoContainer,
          state?.isPlaying && classes.songContentCurrentPlaying
        )}
      >
        <CardMedia image={thumbnail} className={classes.songThumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            {/* {currentSongPlaying ? (
              <Marquee style={{ fontSize: "22px" }}>{title}</Marquee>
            ) : (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.textWhiteSpace}
              >
                <Marquee style={{ fontSize: "22px" }}>{title}</Marquee>
              </Typography>
            )} */}
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.textWhiteSpace}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={clsx(
                state?.isPlaying && classes.songPlayingColorArtist
              )}
            >
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              size="small"
              color="primary"
              onClick={handleTogglePlay}
              className={clsx(
                state?.isPlaying && classes.songPlayingColorArtist
              )}
            >
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton
              size="small"
              color="secondary"
              onClick={handleAddOrRemoveToQueue}
            >
              <Save
                className={clsx(
                  state?.isPlaying
                    ? classes.songPlayingColorArtist
                    : classes.songPlayingColorArtistPurple
                )}
              />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default SongList;
