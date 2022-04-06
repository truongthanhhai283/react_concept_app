import React from "react";
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
import { useSubscription } from "@apollo/react-hooks";

import { SongType } from "../../type";
import { PlayArrow, Save } from "@material-ui/icons";
import { GET_SONGS } from "../../graphql/subscription";

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
  const { title, thumbnail, artist } = song;

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
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>

            <IconButton size="small" color="secondary">
              <Save color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default SongList;
