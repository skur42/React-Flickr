import React from "react";
import { PacmanLoader } from "react-spinners";
import "./styles/Loader.css";

const Loader = () => (
  <div className="loader">
    <PacmanLoader color="#FF0084"/>
  </div>
);

export default Loader;