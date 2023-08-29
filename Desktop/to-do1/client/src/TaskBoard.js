import React, { useState } from 'react';
import './TaskBoard.css';

function TaskBoard() {
  const [taskLists, setTaskLists] = useState([
    'Task 1',
    'Task 2',
    'Task 3',
   
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('index');
    const updatedTaskLists = [...taskLists];
    const [draggedTask] = updatedTaskLists.splice(dragIndex, 1);
    updatedTaskLists.splice(dropIndex, 0, draggedTask);
    setTaskLists(updatedTaskLists);
  };

  return (
    <div className="board">
      {taskLists.map((task, index) => (
        <div
          key={index}
          className="task-list"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {task}
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
