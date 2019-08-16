import React from 'react'
import Link from './link.jsx'
const Footer = ({ filter, setVisibilityFilter }) => (
    <footer className="footer">
        <span className="todo-count"><strong>0</strong> item left</span>
        <ul className="filters">
            <Link onClick={() => setVisibilityFilter('All')} selected={filter === 'All'? true : false}>All</Link>
            <Link onClick={() => setVisibilityFilter('Active')} selected={filter === 'Active' ? true : false}>Active</Link>
            <Link onClick={() => setVisibilityFilter('Completed')} selected={filter === 'Completed' ? true : false}>Completed</Link>
        </ul>
        <button className="clear-completed">Clear completed</button>
    </footer>
)
export default Footer