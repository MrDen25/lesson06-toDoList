import { useEffect, useState } from 'react';
import List from './components/List';
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    return storedTodos ? storedTodos : [];
  });
  
  const [value, setValue] = useState("");

  // Додавання задачі по Button
  const addTask = () => {
    if (value.trim() !== "") {
      setTasks([...tasks, {
        title: value,
        id: uuidv4(),
        status: false,
        time: new Date().toLocaleString()
      }]);
      setValue("");
    }
  };
  
  // Зберігання чекбоксу
  const toggleStatus = (id) => {
    const updateStatus = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(updateStatus);
  };
  
  // Додавання задачі по Enter
  const addTaskOnKey = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Видалення задачі
  const dellTask = (id) => {
    const dell = tasks.filter(task => task.id !== id);
    setTasks(dell);
  };
  
// Редагування задачі
  const editTask = (id, newTitle) => {
    const edit = tasks.map(el => {
      if (el.id === id) {
        return { ...el, title: newTitle, time: new Date().toLocaleString() };
      }
      return el;
    });
    setTasks(edit);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='container'>
      <h1>Note your tasks</h1>
      <h3>Виконані задачі: {tasks.filter(el => el.status === true).length}</h3>
      
      <div className="input-field">
        <div className="inp-row">
          <input 
            type="text" 
            value={value} 
            onKeyDown={addTaskOnKey} 
            onChange={(e) => setValue(e.target.value)} 
          />
          <button onClick={addTask}>
            Додати задачу
          </button>
        </div>
        <label>Name task</label>
      </div>
      
      <List 
        tasks={tasks} 
        toggleStatus={toggleStatus} 
        dellTask={dellTask} 
        editTask={editTask} 
      />
    </div>
  );
}

export default App;