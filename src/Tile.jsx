/* eslint-disable react/prop-types */
import * as icons from "react-icons/gi";
export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className={
            "flex items-center justify-center rounded-lg size-16 md:size-20 bg-indigo-300 text-indigo-900/30 dark:bg-indigo-500 text-center hover:animate-pulse hover:shadow-lg hover:shadow-indigo-400 transition-all"
          }
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className='inline-block rounded-lg p-2 size-16 md:size-20 bg-indigo-600 text-white hover:ring-red-600'>
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className='inline-block size-16 md:size-20 text-indigo-200 dark:text-indigo-900'>
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
            className='w-[500px]'
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return (
    <button onClick={flip} className={className}>
      <icons.GiCarambola
        style={{
          display: "inline-block",
          width: "40%",
          height: "40%",
          verticalAlign: "top",
        }}
      />
    </button>
  );
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
