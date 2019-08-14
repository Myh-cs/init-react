import React from 'react'
// import Footer from './Footer'
import AddTodo from './containers/addTodo'
import VisibleTodoList from './containers/visibleTodoList'
import './index.css'
const ToDoMVC = () => (
    <div className="todoapp">
        <AddTodo />
        <VisibleTodoList />
    </div>
)

export default ToDoMVC