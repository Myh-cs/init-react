import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Todo from './todo.jsx';


storiesOf('pages/Todo/components', module).add('todo', () => {
    const props = {
        completed: boolean("completed", true),
        editing: boolean("editing", false),
        onToggle: action('onToggle'),
        handleEdit: action('handleEdit'),
        title: text('title','this is title'),
        onDestroy: action('onDestroy'),
        editText: text('editText','editText'),
        handleChange: action('handleChange'),
        handleKeyDown: action('handleKeyDown')
    }
    return <Todo {...props} />
});


