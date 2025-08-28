import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";


export default function Item({ title, status, id, time }) {
    const { editTask, toggleStatus, dellTask } = useTaskContext();
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);

    const handleSave = () => {
        if (editValue.trim() !== "") {
            editTask(id, editValue);
            setEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setEditValue(title);
            setEditing(false);
        }
    };

    return (
        <li className={status ? "todo done" : "todo"}>
            <input 
                type="checkbox"
                checked={status}
                onChange={() => toggleStatus(id)}
            />
            
            {editing ? (
                <input 
                    type="text" 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setEditing(true)}>{title}</span>
            )}
            
            <small>{time}</small>
            
            <div className="todo-actions">
                {editing ? (
                    <button className="todo-btn save" onClick={handleSave}>
                        💾
                    </button>
                ) : (
                    <button className="todo-btn edit" onClick={() => setEditing(true)}>
                        ✏️
                    </button>
                )}
                
                <button className="todo-btn delete" onClick={() => dellTask(id)}>
                    🗑️
                </button>
            </div>
        </li>
    );
}