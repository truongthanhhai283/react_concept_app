import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from "../../graphql/mutation";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const AddSong = () => {
  const DEFAULT_SONG =
  {
    duration: 0,
    title: '',
    artist: "",
    thumbnail: "",
    url: ""
  }


  const classes = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG)
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable =
      (SoundcloudPlayer.canPlay(url)) ||
      (YoutubePlayer.canPlay(url));
    setPlayable(isPlayable);
  }, [url]);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloundInfo(nestedPlayer);
    }
    setSong({ ...songData, url })
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      title,
      duration,
      artist: author,
      thumbnail,
      url
    };
  };

  const getSoundcloundInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  };

  const handleChangeSong = (event) => {
    const { name, value } = event.target
    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }))
  }

  const handleAddSong = async () => {
    const { url, title, duration, artist, thumbnail } = song
    // addSong({
    //   variables: {
    //     ...song
    //   }
    // })

    try {
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: url.length > 0 ? thumbnail : null,
          duration: url.length > 0 ? duration : null,
          artist: url.length > 0 ? artist : null,
          title: url.length > 0 ? title : null,
        }
      })
      handleCloseDialog()
      setSong(DEFAULT_SONG)
      setUrl('')
    } catch (error) {
      console.log("Error when adding song...", error);
    }
  }

  const handleError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field)
  }

  const { thumbnail, title, artist } = song

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="Song"
            className={classes.thumbnail}
          />
          <TextField value={title} margin="dense" name="title" label="Title" fullWidth onChange={handleChangeSong} error={handleError('title')} helperText={handleError('title') && 'Fill out field'} />
          <TextField value={artist} margin="dense" name="artist" label="Artist" fullWidth onChange={handleChangeSong} error={handleError('artist')} helperText={handleError('artist') && 'Fill out field'} />
          <TextField
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            onChange={handleChangeSong}
            error={handleError('thumbnail')} helperText={handleError('thumbnail') && 'Fill out field'}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Addsong
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        placeholder="Add Youtube or soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <Button
        disabled={!playable}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
        className={classes.addSongButton}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden={true} onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
