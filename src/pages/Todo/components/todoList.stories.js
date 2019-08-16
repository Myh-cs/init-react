import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TodoList from './todoList.jsx';


storiesOf('pages/Todo/components', module).add('todoList', () => {
    const props = {
        todos: [{
            id: 0,
            text: 'this is title',
            title: 'this is title',
            completed: false
        },
        {
            id: 1,
            text: 'this is title',
            title: 'this is title2',
            completed: false
        }],
        onToggle: action('onToggle')
    }
    return <TodoList {...props} />
});


