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

import { SongType } from "../../type";
import { PlayArrow, Save } from "@material-ui/icons";

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
  let loading = false;

  const song = {
    title: "Love",
    artist: "Moon",
    thumbnail:
      "https://bestlifeonline.com/wp-content/uploads/sites/3/2019/03/Earbuds-against-heart-background.jpg",
  };

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
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, index) => (
        <Song key={index} song={song} />
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
