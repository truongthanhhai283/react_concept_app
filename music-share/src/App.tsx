import React from "react";
import { Grid } from "@material-ui/core";

import Header from "./components/Header";
import SongPlay from "./components/Song/SongPlay";
import AddSong from "./components/Song/AddSong";
import SongList from "./components/Song/SongList";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>

        <Grid item xs={12} md={5}>
          <SongPlay />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
