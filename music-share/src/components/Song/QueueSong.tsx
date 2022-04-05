import React from "react";
import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px ",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const QueueSong = () => {
  const getterThanMd = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  const song = {
    title: "Love",
    artist: "Moon",
    thumbnail:
      "https://bestlifeonline.com/wp-content/uploads/sites/3/2019/03/Earbuds-against-heart-background.jpg",
  };

  return (
    <>
      {getterThanMd && (
        <div
          style={{
            margin: "10px 0",
          }}
        >
          <Typography color="textSecondary" variant="button">
            QUEUE (5)
          </Typography>
          {Array.from({ length: 5 }, () => song).map((song, index) => (
            <QueueSongList key={index} song={song} />
          ))}
        </div>
      )}
    </>
  );
};

const QueueSongList = ({ song }: any) => {
  const classes = useStyles();
  const { title, thumbnail, artist } = song;
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt={title} className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueueSong;
