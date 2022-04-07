import React, { useReducer } from "react";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";

import Header from "./components/Header";
import SongPlayer from "./components/Song/SongPlayer";
import AddSong from "./components/Song/AddSong";
import SongList from "./components/Song/SongList";
import songReducer from "hooks/reducer";
import { ActionType, ISong } from "type";

export const initialState: ISong = {
  song: {
    id: "",
    title:
      "",
    artist: "",
    thumbnail: "",
    url: "",
    duration: 0,
  },
  isPlaying: false,
};

export const SongContext = React.createContext<{
  state: typeof initialState;
  dispatch: (action: ActionType) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

function App() {
  const [state, dispatch] = useReducer(songReducer, initialState);

  const getterThanSm = useMediaQuery((theme: any) =>
    theme.breakpoints.up("sm")
  );

  const getterThanMd = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );


  return (
    <SongContext.Provider value={{ state, dispatch }}>
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
                  paddingTop: 90,
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
    </SongContext.Provider>
  );
}

export default App;
