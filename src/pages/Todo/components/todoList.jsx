import React from 'react'
import Todo from './todo.jsx'
import '../index.css'
const TodoList = ({ todos, onToggle, onDestroy, handleEdit }) => {
    return(
        <ul className="todo-list">
            {todos.map((item) => (
                <Todo 
                    key={item.id}
                    title={item.text} 
                    editText={item.text}
                    completed={item.completed}
                    editing={item.editing}
                    onToggle={() => onToggle(item.id)}
                    onDestroy={() => onDestroy(item.id)}
                    handleEdit={() => handleEdit(item.id)}
                />
            ))}
        </ul>
    )
}
export default TodoList