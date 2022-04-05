import React from "react";

import Header from "./components/Header";
import SongPlay from "./components/Song/SongPlay";
import AddSong from "./components/Song/AddSong";
import SongList from "./components/Song/SongList";

function App() {
  return (
    <>
      <Header />
      <AddSong />
      <SongList />
      <SongPlay />
    </>
  );
}

export default App;
