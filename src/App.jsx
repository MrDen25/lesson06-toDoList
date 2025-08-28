import { useState } from 'react';
import List from './components/List';
import './App.css';
import { useTaskContext } from './context/TaskContext';
import { useThemeContext } from './context/ThemeContext';

function App() {

    const { theme, toggleTheme } = useThemeContext()

    const [value, setValue] = useState("");
    const { tasks, addTask } = useTaskContext();

    const handleAddTask = () => {
        addTask(value);
        setValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <div className={`container ${theme}`}>
            <div className='header'>
                <h1>Note your tasks</h1>
                <button onClick={toggleTheme}>{theme === "light"? "🌙" : "☀️" }</button>
            </div>
            <h3>Незавершені задачі: {tasks.filter(el => !el.status).length}</h3>
            <div className="input-field">
                <div className="inp-row">
                    <input 
                        type="text" 
                        value={value} 
                        onKeyDown={handleKeyDown} 
                        onChange={(e) => setValue(e.target.value)} 
                    />
                    <button onClick={handleAddTask}>
                        Додати задачу
                    </button>
                </div>
                <label>Name task</label>
            </div>
            
            <List />
        </div>
    );
}

export default App;