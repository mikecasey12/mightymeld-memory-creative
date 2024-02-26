/* eslint-disable react/prop-types */
import {
  GiShare,
  GiSoundOn,
  GiMushroomHouse,
  GiPlayButton,
  GiGearHammer,
} from "react-icons/gi";
import uiTapSound from "./assets/sounds/ui-click.mp3";

const MenuModal = ({
  menuModalRef,
  handleCloseModal,
  audioRef,
  playMusic,
  pauseMusic,
  mute,
  setMute,
}) => {
  const onContinue = () => {
    audioRef.current.src = uiTapSound;
    audioRef.current.load();
    audioRef.current.play();
    menuModalRef.current?.close();
  };

  const soundControl = () => {
    if (mute) {
      playMusic();
      setMute(false);
      return;
    }

    setMute(true);
    pauseMusic();
  };
  return (
    <dialog
      ref={menuModalRef}
      id='menu-modal'
      className='h-screen w-screen z-50 bg-gradient-to-b from-indigo-400 to-indigo-600 md:h-4/5 md:w-[60vw] bg-indigo-200 bg-cover bg-center rounded-3xl backdrop:blur-md backdrop:bg-black/10'
    >
      <div className='bg-black/30 size-full p-10 gap-20 dark:bg-black/70'>
        <div className='flex flex-col items-center justify-center size-full gap-20'>
          <div className='flex justify-between items-center w-full'>
            <button className='size-16 rounded-full bg-indigo-300/50 flex items-center justify-center'>
              <div className='size-12 rounded-full bg-gradient-to-bl from-indigo-300 to-indigo-500 p-3 text-indigo-100'>
                <GiShare
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </div>
            </button>
            <h1 className='text-4xl rounded-lg p-2 font-play font-bold text-white shadow-2xl inset-40'>
              MEMORY
            </h1>
            <button
              onClick={soundControl}
              className='size-16 rounded-full bg-orange-300/50 flex items-center justify-center'
            >
              <div className='size-12 rounded-full bg-gradient-to-bl from-orange-300 to-orange-500 p-3 text-orange-100'>
                <GiSoundOn
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
          <div className='flex flex-col items-center justify-center gap-2'>
            <button
              onClick={onContinue}
              className='size-24 rounded-full bg-green-300/50 flex items-center justify-center animate-pulse'
            >
              <div className='size-20 rounded-full bg-gradient-to-bl from-green-300 to-green-500 p-3 text-green-100'>
                <GiPlayButton
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </div>
            </button>
            <h1 className='font-play font-bold text-2xl inset-3 text-white'>
              CONTINUE
            </h1>
          </div>
          <div className='flex gap-4'>
            <button className='size-16 rounded-full bg-indigo-300/50 flex items-center justify-center'>
              <div className='size-12 rounded-full bg-gradient-to-bl from-indigo-300 to-indigo-500 p-3 text-indigo-100'>
                <GiGearHammer
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
              onClick={handleCloseModal}
              className='size-16 rounded-full bg-red-300/50 flex items-center justify-center'
            >
              <div className='size-12 rounded-full bg-gradient-to-bl from-red-300 to-red-500 p-3 text-red-100'>
                <GiMushroomHouse
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
      </div>
    </dialog>
  );
};

export default MenuModal;
