import { useState } from "react";
import "./Item.css"

export default function Item({ title, status, id, time, toggleStatus, dellTask, editTask }) {
    
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(title)

    const handleSave = () => {
        if (value.trim() !== "") {
            editTask(id, value)
            setEditing(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave()
        }
    }

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
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    onBlur={handleSave}
                    autoFocus 
                    onKeyDown={handleKeyDown} 
                />
            ) : (
                <span onDoubleClick={()=>setEditing(true)}>{value}</span>
            )}
            
            <small>{time}</small>
            
            {editing ? (
                <i onClick={handleSave}>💾</i>
            ) : (
                <i onClick={() => setEditing(true)}>Редагувати</i>
            )}
            
            <i className="delete" onClick={() => dellTask(id)}>X</i>
        </li>
    );
}