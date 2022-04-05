import React from "react";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";

import Header from "./components/Header";
import SongPlayer from "./components/Song/SongPlayer";
import AddSong from "./components/Song/AddSong";
import SongList from "./components/Song/SongList";

function App() {
  const getterThanSm = useMediaQuery((theme: any) =>
    theme.breakpoints.up("sm")
  );

  const getterThanMd = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      {/* {getterThanSm && <Header />} */}
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={7}
          style={{
            padding: getterThanSm ? 80 : 10,
          }}
        >
          <AddSong />
          <SongList />
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          style={
            getterThanMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: "0",
                  top: "70",
                  paddingTop: 80,
                }
              : {
                  position: "fixed",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                }
          }
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
