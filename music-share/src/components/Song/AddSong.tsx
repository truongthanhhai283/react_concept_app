import React, { useState } from "react";
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
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);

  const handleCloseDialog = () => {
    setDialog(false);
  };

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
            src="https://bestlifeonline.com/wp-content/uploads/sites/3/2019/03/Earbuds-against-heart-background.jpg"
            alt="Song"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary">
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
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
        className={classes.addSongButton}
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
