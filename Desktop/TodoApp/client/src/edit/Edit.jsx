import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = ({ }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { task, assignedEmail, dueDate, _id } = location.state.task;
    const [tasks, setTasks] = useState({ task, assignedEmail, dueDate });
    const inputHandle = (e) => {
        setTasks({
            ...tasks, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`http://localhost:3000/api/editTask/${_id}`, {
            method: "POST",
            body: JSON.stringify({
                task: tasks
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await res.json();
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
                    value={tasks.task}
                    onChange={inputHandle}
                    required
                />

                <label for="assigned-email">Assigned Email</label>
                <input
                    type="email"
                    id="assigned-email"
                    name="email"
                    value={tasks.assignedEmail}
                    onChange={inputHandle}
                    required
                />

                <label for="task-due-date">Due Date:</label>
                <input
                    type="date"
                    id="project-due-date"
                    name="due_date"
                    value={tasks.dueDate}
                    onChange={inputHandle}
                    required
                />
                <button className="submit-button">Submit</button>

            </form>
        </>
    );
};

export default Edit;