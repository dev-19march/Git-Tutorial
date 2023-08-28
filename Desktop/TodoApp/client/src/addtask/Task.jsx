import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./addtask.css";

const Addtask = ({ getTask }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [email, setEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const emailHandler = async () => {
      const fetchdata = () => {
        fetch("http://localhost:3000/api/getMember").then((response) => response.json()).then((data) => {
         
          console.log(data.emails);
          const y=data.emails;
          const filteredData = y.filter(item => item.status === 'Verified');

          console.log(filteredData);
          setUser(filteredData);
          
        })
      }
      fetchdata();
    }
    emailHandler();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/addtask", {
      method: "POST",
      body: JSON.stringify({
       status:"pending", task: task, assignedEmail: email, dueDate: dueDate
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const data = await res.json();
    console.log(data);
    const newTask = {
      id: tasks.length + 1,
      status: "pending",
      task: data.task,
      assignedEmail: data.assignedEmail,
      dueDate: data.dueDate,
    };
    getTask(newTask);
    setTask("");
    setEmail("");
    setDueDate("");

    navigate("/");
  };
  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <label for="task-name">Task</label>
        <input
          type="text"
          id="project-name"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />


        {/* <label for="assigned-email">Assigned Email</label>
        <div className="email-input-container">
         
          <input
            type="email"
            // id="assigned-email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              emailHandler()
            }}
            required
          />
    
          <Link to="/inviteuser" > <button
            type="button"
            className="invite-button" >
            Invite User
          </button></Link>
        </div> */}


        <label for="assigned-email">Assigned Email</label>
        <div className="email-input-container">
          <select
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="select-buttom"
          
          >
            <option value="" disabled>Select an email</option>
            {users.map((user) => (
              <option key={user.id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>

          <Link to="/inviteuser">
            <button type="button" className="invite-button">
              Invite User
            </button>
          </Link>
        </div>


        <label for="task-due-date">Due Date:</label>
        <input
          type="date"
          id="project-due-date"
          name="due_date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button className="submit-button">Submit</button>

      </form>
    </>
  );
};

export default Addtask;