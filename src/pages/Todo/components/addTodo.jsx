import React from 'react';

export default function({ handleAddTodo }){
    let input;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.value.trim()) { return; }
        handleAddTodo(input.value);
        input.value = '';
    }
    return (
        <header className="header">
            <h1>todos</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    ref={node => (input=node)}
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                />
            </form>
        </header>
    )
}