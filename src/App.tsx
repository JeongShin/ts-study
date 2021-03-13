import React, { useState } from "react";
import Posts from "./components/Posts";
import Navbar from "./components/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleNav = (visible: boolean) => {
    setIsVisible(visible);
  }

  return (
    <div className="bg-gray-50">
      <Navbar visible={ isVisible }/>
      <Posts toggleNav={ toggleNav }/>
    </div>
  );
}

export default App;
