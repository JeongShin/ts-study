import React from "react";

function App(props: { visible: Boolean }) {
  const { visible } = props;
  return (
    <nav className={ visible ? "flex justify-center items-center bg-indigo-400 h-14 sticky top-0 bg-opacity-90" : "hidden" }>
      <a href="/" className="text-2xl text-white hover:text-yellow-300">TS Study🙇🏻‍♂️</a>
    </nav>
  );
}

export default App;
