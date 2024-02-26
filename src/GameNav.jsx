/* eslint-disable react/prop-types */
import * as icons from "react-icons/gi";
import uiTapSound from "./assets/sounds/ui-click.mp3";

const GameNav = ({
  tries,
  handleModeSwitch,
  isDark,
  bestScore,
  isStart,
  menu,
  audioRef,
}) => {
  const onShowModal = () => {
    audioRef.current.src = uiTapSound;
    audioRef.current.load();
    audioRef.current.play();

    menu.current?.showModal();
  };

  const onModeSwitch = () => {
    audioRef.current.src = uiTapSound;
    audioRef.current.load();
    audioRef.current.play();

    handleModeSwitch();
  };
  return (
    <>
      <div className='relative flex gap-4 items-center'>
        {!isStart && (
          <div className='p-2 shadow-md rounded-lg bg-indigo-100 dark:bg-indigo-950'>
            <h3 className='bg-indigo-600 text-white rounded-lg px-2'>Tries:</h3>
            <div className='flex gap-0 items-center'>
              <div className='h-12 md:h-14 text-red-700 z-10'>
                <icons.GiCardPlay
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </div>
              <div className='px-4 py-1 bg-indigo-200 rounded-lg -ml-8 h-6 md:-ml-6 md:px-6 md:h-8'>
                <h3
                  className={
                    "text-sm font-bold bg-indigo-600 text-white px-2 rounded-md md:text-md md:px-4"
                  }
                >
                  {tries}
                </h3>
              </div>
            </div>
          </div>
        )}
        {!isStart && (
          <div className='p-2 shadow-md rounded-lg bg-indigo-100 dark:bg-indigo-950'>
            <h3 className='bg-indigo-600 text-white rounded-lg px-2'>
              Best Score:
            </h3>
            <div className='flex gap-0 items-center'>
              <div className='h-12 md:h-14 text-red-700 z-10 -rotate-6'>
                <icons.GiDiamondTrophy
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </div>
              <div className='px-4 py-1 bg-indigo-200 rounded-lg -ml-8 h-6 md:-ml-6 md:px-6 md:h-8'>
                <h3
                  className={
                    "text-sm font-bold bg-indigo-600 text-white px-2 rounded-md md:text-md md:px-4"
                  }
                >
                  {bestScore ? bestScore : 0}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className='h-10 flex gap-2 dark:text-indigo-400'>
          <button
            onClick={onModeSwitch}
            className='text-indigo-500 bg-indigo-200/30 rounded-full size-14 p-2 dark:bg-indigo-950/50 dark:text-indigo-200'
          >
            <div className='size-10 bg-indigo-200 rounded-full p-1 dark:bg-indigo-950'>
              {isDark ? (
                <icons.GiSun
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              ) : (
                <icons.GiMoon
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              )}
            </div>
          </button>
          <button
            onClick={onShowModal}
            className='text-pink-900 bg-pink-200/30 size-14 p-2 dark:bg-pink-950/50 dark:text-pink-200 rounded-full'
          >
            <div className='size-10 bg-pink-200 rounded-full dark:bg-pink-950 p-1 flex items-center justify-center'>
              <icons.GiPauseButton
                style={{
                  display: "block",
                  width: "80%",
                  height: "80%",
                  verticalAlign: "top",
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default GameNav;
