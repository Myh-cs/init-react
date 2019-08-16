import React from 'react';
import '../index.css';
const Todo = ({ 
    completed = false,
    editing = false,
    onToggle,
    handleEdit,
    title,
    onDestroy,
    editText,
    handleChange,
    handleKeyDown
}) => {
    const liStatus = `${completed ? 'completed' : ''} ${editing ? 'editing': ''}`;
    return (
        <li className={liStatus}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={completed}
                    onChange={onToggle}
                />
                <label onDoubleClick={handleEdit}>
                    {title}
                 </label>
                <button
                    className="destroy"
                    onClick={onDestroy}>
                </button>
			</div>
            <input
                className="edit"
                value={editText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />
		</li>
    )
}
export default Todo