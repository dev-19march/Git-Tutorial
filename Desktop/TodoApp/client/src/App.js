import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./navbar/Navbar";
import Addtask from "./addtask/Task";
import Team from "./team-member/Team";
import Invite from "./inviteuser/Invite";


import { useState } from "react";
import { useEffect } from "react";
import Protected from "./protected/Protected";
import Edit from "./edit/Edit";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const getTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/addtask" element={<Protected><Addtask getTask={getTask} /></Protected>} />
        <Route path="/" element={<Protected> <Dashboard /></Protected>} />
        <Route path="/edit" element={<Protected><Edit /></Protected>} />
        <Route path="/team-member" element={<Protected><Team /></Protected>} />
        <Route path="/inviteuser" element={<Protected><Invite /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
