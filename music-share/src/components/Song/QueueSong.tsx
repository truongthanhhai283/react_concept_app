import React, { FC } from "react";
import {
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";

import { ADD_OR_REMOVE_QUEUE } from "graphql/mutation";
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

type Props = {
  queueList?: any;
};

const QueueSong: FC<Props> = ({ queueList }) => {
  const getterThanMd = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  return (
    <>
      {getterThanMd && (
        <div
          style={{
            margin: "10px 0",
          }}
        >
          <Typography color="textSecondary" variant="button">
            QUEUE ({queueList?.length})
          </Typography>
          {queueList?.map((song, index) => (
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
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

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
      <IconButton onClick={handleAddOrRemoveToQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueueSong;
