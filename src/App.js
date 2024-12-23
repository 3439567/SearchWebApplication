import React from "react";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import { Routes, Route } from "react-router-dom";
import Error from "./Error";
import "./App.css";
import Search from "./Search";
const App = () => {
  return (
    <>
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
