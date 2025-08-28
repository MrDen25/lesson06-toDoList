import { createContext, useContext, useEffect, useState } from 'react'; // Додано createContext
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext(null);

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem("tasks");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (value) => {
        if (value && value.trim() !== "") {
            setTasks([...tasks, {
                title: value,
                id: uuidv4(),
                status: false,
                time: new Date().toLocaleString()
            }]);
        }
    };

    const toggleStatus = (id) => {
        const updateStatus = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: !task.status };
            }
            return task;
        });
        setTasks(updateStatus);
    };

    const addTaskOnKey = (e) => {
        if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = ""; 
        }
    };


    const dellTask = (id) => {
        const dell = tasks.filter(task => task.id !== id);
        setTasks(dell);
    };

    const editTask = (id, newTitle) => {
        const edit = tasks.map(el => {
            if (el.id === id) {
                return { ...el, title: newTitle, time: new Date().toLocaleString() };
            }
            return el;
        });
        setTasks(edit);
    };

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            addTask, 
            toggleStatus, 
            addTaskOnKey, 
            dellTask, 
            editTask 
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === null) {
        throw new Error('useTaskContext must be used within TaskContextProvider');
    }
    return context;
};