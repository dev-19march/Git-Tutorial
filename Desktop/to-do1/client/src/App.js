import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Navbar from "./navbar/Navbar";
import Todo from "./TodoPage/Todo";
import HeroSection from "./Hero/Hero";



import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
      
    </>
  );
}

export default App;
