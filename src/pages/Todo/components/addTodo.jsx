import React from 'react';

export function AddTodo({ onSubmit }){
    let input;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.value.trim()) { return; }
        onSubmit(input.value);
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