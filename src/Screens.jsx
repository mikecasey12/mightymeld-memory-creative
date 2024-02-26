/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";
import uiTapSound from "./assets/sounds/ui-click.mp3";
import matchedSound from "./assets/sounds/matched-sound.mp3";
import winSound from "./assets/sounds/win-sound.mp3";
import tapSound from "./assets/sounds/tap-sound.mp3";
import backgroundImage from "./assets/images/bg-image.jpeg";
import GameNav from "./GameNav";
import MenuModal from "./MenuModal";
import GlowBlob from "./GlowBlob";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({
  start,
  end,
  isDark,
  handleModeSwitch,
  mute,
  setMute,
  playMusic,
  pauseMusic,
}) {
  const menuModalRef = useRef();
  const audioRef = useRef();
  const tileNumberInStorage = localStorage.getItem("tileNumber");

  const onTileSelect = (e) => {
    const checkedTile = e.target.value;
    if (checkedTile !== "16tiles") {
      localStorage.setItem("tileNumber", checkedTile.substring(0, 1));
      return;
    }
    localStorage.setItem("tileNumber", checkedTile.substring(0, 2));
  };

  const handleCloseModal = async (action) => {
    //Restart the Game or replay the game if pressed
    if (action === "replay") {
      menuModalRef.current?.close();
      start();
      return;
    }
    menuModalRef.current?.close();
    end();
  };

  const onPlay = () => {
    start();
  };
  return (
    <>
      <div
        className='h-screen w-full flex justify-center items-center bg-gray-100 font-play'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='h-screen w-full flex flex-col gap-10 justify-center items-center bg-gradient-to-b from-transparent to-black/60 dark:bg-black/70 transform transition-all font-play overflow-y-scroll'>
          <GameNav
            isDark={isDark}
            handleModeSwitch={handleModeSwitch}
            isStart={true}
            menu={menuModalRef}
            audioRef={audioRef}
          />
          <div className='p-4 bg-pink-300/30 rounded-xl'>
            <div className='rounded-2xl bg-gradient-to-b from-pink-200 to-pink-400 bg-pink-100 flex items-center justify-center flex-col px-10 py-16 gap-10 text-pink-500 dark:text-pink-300 dark:from-pink-600 dark:to-pink-950'>
              <h1 className='text-4xl font-bold'>Memory</h1>
              <div className='space-y-2 text-center'>
                <p className='font-semibold text-lg'>
                  Flip over tiles looking for pairs
                </p>
                <div className='space-x-2'>
                  <label
                    htmlFor='4tiles'
                    className='text-[22px] font-medium capitalize inline-block align-middle relative pl-[28px] radio'
                  >
                    <input
                      className='hidden'
                      id='4tiles'
                      type='radio'
                      value='4tiles'
                      name='tiles'
                      defaultChecked={
                        tileNumberInStorage === null ||
                        tileNumberInStorage === "4"
                      }
                      onChange={onTileSelect}
                    />
                    4 Tiles
                    <span className='size-[20px] rounded-[50%] border-4 border-pink-400 block absolute left-0 top-[7px]'></span>
                  </label>
                  <label
                    htmlFor='8tiles'
                    className='text-[22px] font-medium capitalize inline-block align-middle relative pl-[28px] radio'
                  >
                    <input
                      className='hidden'
                      id='8tiles'
                      type='radio'
                      value='8tiles'
                      name='tiles'
                      defaultChecked={tileNumberInStorage === "8"}
                      onChange={onTileSelect}
                    />
                    8 Tiles
                    <span className='size-[20px] rounded-[50%] border-4 border-pink-400 block absolute left-0 top-[7px]'></span>
                  </label>
                  <label
                    htmlFor='16tiles'
                    className='text-[22px] font-medium capitalize inline-block align-middle relative pl-[28px] radio'
                  >
                    <input
                      className='hidden'
                      id='16tiles'
                      type='radio'
                      value='16tiles'
                      name='tiles'
                      defaultChecked={+tileNumberInStorage === 16}
                      onChange={onTileSelect}
                    />
                    16 Tiles
                    <span className='size-[20px] rounded-[50%] border-4 border-pink-400 block absolute left-0 top-[7px]'></span>
                  </label>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center gap-2'>
                <button
                  onClick={onPlay}
                  className='size-24 rounded-full bg-pink-300/50 flex items-center justify-center animate-pulse'
                >
                  <div className='size-20 rounded-full bg-gradient-to-bl from-pink-400 to-pink-600 p-3 text-pink-100'>
                    <icons.GiPlayButton
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    />
                  </div>
                </button>
                <h1 className='font-play font-bold text-2xl'>PLAY</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={uiTapSound} />
      <MenuModal
        menuModalRef={menuModalRef}
        handleCloseModal={handleCloseModal}
        audioRef={audioRef}
        mute={mute}
        setMute={setMute}
        playMusic={playMusic}
        pauseMusic={pauseMusic}
      />
    </>
  );
}

export function PlayScreen({
  end,
  start,
  handleModeSwitch,
  isDark,
  mute,
  setMute,
  playMusic,
  pauseMusic,
}) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [bestScore, setBestScore] = useState(null);
  const [conf, setConf] = useState(false);
  const [restart, setRestart] = useState(false);
  const modalRef = useRef();
  const menuModalRef = useRef();
  const audioRef = useRef();
  const tileNumberInStorage = localStorage.getItem("tileNumber");

  useEffect(() => {
    const bestScoreInStorage = localStorage.getItem("score");

    setBestScore(bestScoreInStorage);
  }, []);

  useEffect(() => {
    if (!conf) return;
    const id = setInterval(() => {
      const bestScoreInStorage = localStorage.getItem("score");
      setBestScore(bestScoreInStorage);
      confetti({
        ticks: 100,
        zIndex: 10000,
      });
    }, 500);
    return () => clearInterval(id);
  }, [conf]);

  const handleCloseModal = (action) => {
    const bestScoreInStorage = localStorage.getItem("score");
    setConf(false);
    setBestScore(bestScoreInStorage);

    //Restart the Game
    if (action === "replay") {
      setRestart(true);
      setTryCount(0);
      modalRef.current?.close();
      start();
      return;
    }

    //Close current active modal
    modalRef.current?.close();

    //End the Game
    end();
  };

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles && !restart) return tiles;

    setRestart(false);

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    //Make a tap sound on each onTap
    audioRef.current.src = tapSound;
    audioRef.current.load();
    audioRef.current.play();

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        audioRef.current.src = matchedSound;
        audioRef.current.load();
        audioRef.current.play();
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            const isFirstRun = localStorage.getItem("firstrun");

            audioRef.current.src = winSound;
            audioRef.current.load();
            audioRef.current.play();

            if (isFirstRun) {
              if (tryCount < bestScore) {
                localStorage.setItem("score", tryCount + 1);
                localStorage.setItem("firstrun", true);
              }
            } else {
              localStorage.setItem("score", tryCount + 1);
              localStorage.setItem("firstrun", false);
            }

            modalRef.current?.showModal();
            setConf(true);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div
        className='bg-contain bg-bottom relative h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 dark:bg-black font-play'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='py-10 bg-cover bg-center h-screen w-full flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-transparent to-black/60 dark:bg-black/70 font-play transition-all overflow-y-scroll'>
          <GlowBlob />
          <GameNav
            tries={tryCount}
            bestScore={bestScore}
            handleModeSwitch={handleModeSwitch}
            isDark={isDark}
            menu={menuModalRef}
            audioRef={audioRef}
          />
          <div className='p-4 bg-indigo-300/30 rounded-xl'>
            <div className='relative grid grid-cols-4 gap-4 bg-indigo-100 rounded-xl p-4 dark:bg-indigo-950'>
              {getTiles(tileNumberInStorage ? +tileNumberInStorage : 4).map(
                (tile, i) => (
                  <Tile key={i} flip={() => flip(i)} {...tile} />
                )
              )}
            </div>
          </div>
          <dialog
            ref={modalRef}
            id='modal'
            className='w-screen md:w-2/6 h-[60vh] rounded-xl border-8 bg-gradient-to-b from-indigo-400 to-indigo-600 border-indigo-300 dark:bg-indigo-950 dark:border-indigo-500 font-play shadow-2xl backdrop:backdrop-blur-sm transition-all'
          >
            <div className='flex flex-col items-center justify-center gap-4 px-4 py-8'>
              <h3 className='font-bold uppercase text-4xl italic -mb-6 text-white shadow-inner'>
                Complete!
              </h3>
              <div className=' w-2/3 h-[200px] p-4 bg-indigo-300/30 dark:bg-indigo-900 rounded-xl dark:text-indigo-300'>
                <div className='p-4 size-full flex flex-col items-center justify-center bg-indigo-300 dark:bg-indigo-900 rounded-xl dark:text-indigo-300'>
                  <div className='size-14 text-yellow-600'>
                    <icons.GiStarMedal
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <h3 className='font-bold text-2xl text-indigo-600 dark:text-indigo-200'>
                    Your Score: <span>{tryCount}</span>
                  </h3>
                  <h3 className='font-medium text-lg text-green-600'>
                    Best Score: <span>{bestScore}</span>
                  </h3>
                </div>
              </div>
              <div className='flex gap-4'>
                <button
                  onClick={() => handleCloseModal("replay")}
                  className='size-16 rounded-full bg-indigo-300/50 flex items-center justify-center'
                >
                  <div className='size-12 rotate-[60deg] rounded-full bg-gradient-to-bl from-indigo-300 to-indigo-500 p-3 text-indigo-100'>
                    <icons.GiClockwiseRotation
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    />
                  </div>
                </button>
                <button
                  onClick={() => handleCloseModal("start")}
                  className='size-16 rounded-full bg-red-300/50 flex items-center justify-center'
                >
                  <div className='size-12 rounded-full bg-gradient-to-bl from-red-300 to-red-500 p-3 text-red-100'>
                    <icons.GiMushroomHouse
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        verticalAlign: "top",
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <audio ref={audioRef} src={tapSound} />
      <MenuModal
        menuModalRef={menuModalRef}
        handleCloseModal={handleCloseModal}
        audioRef={audioRef}
        mute={mute}
        setMute={setMute}
        pauseMusic={pauseMusic}
        playMusic={playMusic}
      />
    </>
  );
}
