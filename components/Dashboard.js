import React from "react";
import YouTube from "react-youtube";
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

export default function Dashboard() {
  return <YouTube videoId="TCXrYLl4GBs" opts={opts} />;
}
