import React from 'react'

const Link = ({ selected, children, onClick }) => (
    <li>
        <span
            className={selected ? 'selected': ''}
            onClick={onClick}
        >
            {children}
        </span>
    </li>
)
export default Link