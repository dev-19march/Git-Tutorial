import React, { useState } from 'react';
import './Hero.css';

function HeroSection() {
  const [tasks, setTasks] = useState([
    // { id: 1, text: "Task 1", category: "In Progress" },
    // { id: 2, text: "Task 2", category: "To Do" },
    // { id: 3, text: "Task 3", category: "Done" },
    // // ... add more tasks as needed
  ]);
  
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("In Progress");

  const handleDragStart = (e, taskIndex) => {
    e.dataTransfer.setData("text/plain", taskIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks[sourceIndex];
    movedTask.category = targetCategory;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText,
        category: selectedCategory,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  return (
    <div className="hero-container">
      <h1>Let's explore our todo-app {'\uD83D\uDE0A'}</h1>
      <p className='icon'>Add your daily tasks and get things done {'\uD83D\uDC4D'}</p>
      <div className="tasks-container">
        <div className="category-column">
          <h2 className='heading'>In Progress</h2>
          <div
            className="category"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "In Progress")}
          >
            {tasks.map((task, index) => (
              task.category === "In Progress" && (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                >
                  {task.text}
                </div>
              )
            ))}
          </div>
        </div>
        <div className="category-column">
          <h2 className='heading2'>To Do</h2>
          <div
            className="category"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "To Do")}
          >
            {tasks.map((task, index) => (
              task.category === "To Do" && (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                >
                  {task.text}
                </div>
              )
            ))}
          </div>
        </div>
        <div className="category-column">
          <h2 className='heading3'>Done</h2>
          <div
            className="category"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Done")}
          >
            {tasks.map((task, index) => (
              task.category === "Done" && (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                >
                  {task.text}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      <div className="new-task">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default HeroSection;
