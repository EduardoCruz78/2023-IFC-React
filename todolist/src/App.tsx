import React, { useState, KeyboardEvent } from 'react';

interface Task {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a task..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
