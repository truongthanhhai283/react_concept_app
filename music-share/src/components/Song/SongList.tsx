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
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.songThumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary" onClick={handleTogglePlay}>
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton
              size="small"
              color="secondary"
              onClick={handleAddOrRemoveToQueue}
            >
              <Save color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default SongList;
