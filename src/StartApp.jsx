/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";

function StartApp({ playDefaultSound, playMusic, pauseMusic, mute, setMute }) {
  const [gameState, setGameState] = useState("start");
  const [isDark, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    const mode = localStorage.getItem("mode");
    setDarkMode(mode == null ? false : mode === "false" ? false : true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleModeSwitch = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("mode", !isDark);
  };

  const onEnd = () => {
    playDefaultSound();
    setGameState("start");
  };

  const onStart = () => {
    playDefaultSound();
    setGameState("play");
  };

  switch (gameState) {
    case "start":
      return (
        <StartScreen
          start={onStart}
          end={onEnd}
          isDark={isDark}
          handleModeSwitch={handleModeSwitch}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          mute={mute}
          setMute={setMute}
        />
      );
    case "play":
      return (
        <PlayScreen
          end={onEnd}
          start={onStart}
          handleModeSwitch={handleModeSwitch}
          isDark={isDark}
          playMusic={playMusic}
          pauseMusic={pauseMusic}
          setMute={setMute}
          mute={mute}
        />
      );
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default StartApp;
