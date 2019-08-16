import React from 'react'
import AddTodo from './containers/addTodo'
import TodoList from './containers/todoList'
import Footer from './containers/footer'
import './index.css'
const ToDoMVC = () => (
    <div className="todoapp">
        <AddTodo />
        <TodoList />
        <Footer />
    </div>
)

export default ToDoMVC