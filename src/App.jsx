import { useRef, useState } from "react";
import uiTapSound from "./assets/sounds/ui-click.mp3";
import inGameSound from "./assets/sounds/in-game-sound.mp3";
import StartApp from "./StartApp.jsx";

const App = () => {
  const audioRef = useRef();
  const musicRef = useRef();
  const [mute, setMute] = useState(false);

  const playDefaultSound = () => {
    audioRef.current.src = uiTapSound;
    audioRef.current.load();
    audioRef.current.play();
  };

  const playMusic = () => {
    if (musicRef.current.paused) {
      musicRef.current.vol = 0.2;
      musicRef.current.play();
    }
  };

  const pauseMusic = () => {
    musicRef.current.pause();
  };

  return (
    <>
      <StartApp
        playDefaultSound={playDefaultSound}
        playMusic={playMusic}
        pauseMusic={pauseMusic}
        mute={mute}
        setMute={setMute}
      />
      <audio autoPlay loop ref={musicRef} src={inGameSound} />
      <audio ref={audioRef} src={uiTapSound} />
    </>
  );
};

export default App;
