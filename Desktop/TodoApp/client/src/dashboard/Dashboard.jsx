import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setfilterTask] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      fetch("http://localhost:3000/api/getTask").then((response) => response.json()).then((data) => {
        // console.log(data.tasks);
        setTasks(data.tasks);
        setfilterTask(data.tasks);
        // console.log(data.tasks);
      })
    }
    fetchdata();
  }, []);

  const handleAll = () => {
    setfilterTask(tasks);
  }
  const handlePending = () => {
    setfilterTask(tasks.filter((todo) => (todo.status === "pending")));
  };

  const handleDone = () => {
    setfilterTask(tasks.filter((todo) => (todo.status === "done")));
  };


  const handleDelete = async (task) => {
    // console.log(task);
    const res = await fetch("http://localhost:3000/api/delete", {
      method: "POST",
      body: JSON.stringify({
        task: task
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    console.log(task);
    const id = task._id;
    console.log(id);
    setTasks((prevtasks) => prevtasks.filter((todo) => todo._id !== id));
  };

  const statusHandler = async (event, task) => {
    const email = task.assignedEmail;
    const curr_status = event.target.value;
    const id = task._id;
    const res = await fetch(`http://localhost:3000/api/taskStatus/`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        status: event.target.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === id) ? { ...task, status: curr_status } : task))
  }

  return (
    <>
      <div className="button-container">
        <button onClick={handleAll}>  ALL </button>
        <button onClick={handlePending} > PENDING </button>
        <button onClick={handleDone} > DONE </button>
      </div>
      <div className="todo-list">
        <div className="todo-heading">
          <span>Status</span>
          <span>Task</span>
          <span>Assigned Email</span>
          <span>Due Date</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
        {filterTask.map((task) => (
          <div key={task.id} className="todo-item">
            <span>
              <select
                value={task.status}
                onChange={(event) => { statusHandler(event, task) }}
              >
                <option className="pending" value="pending">Pending</option>
                <option className="done" value="done" >Done</option>
                <option className="revisit" value="revisit">Revisit</option>
              </select>
            </span>
            <span>{task.task}</span>
            <span>{task.assignedEmail}</span>
            <span>{task.dueDate}</span>
            <span>
              <Link to="/edit" state={{ task: task }}><button>Edit</button></Link>
            </span>
            <span>
              <button onClick={() => handleDelete(task)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Dashboard;
