import React from 'react'
import { shallow } from 'enzyme'
import TodoList from './todoList.jsx'

const props = {
    todos: [
        {
            id: 1,
            text: 'text1',
            completed: false,
            editing: false
        },
        {
            id: 2,
            text: 'text2',
            completed: true,
            editing: true

        }
    ],

    onToggle: jest.fn(),
    onDestroy: jest.fn(),
    handleEdit: jest.fn()
}
const setup = () => {
    
    let component = shallow(
        <TodoList {...props}/>
    )
    return {
        todos: component.find('Todo'),
        sectodo: component.find('Todo').at(1),
    }
}

describe('<TodoList/>', () => {
    it('should has two todos', () => {
        const { todos } = setup()
        expect(todos.length).toBe(2)
    });
    
    it('second todo props is useable', () => {
        const { sectodo } = setup();
        const secprops = {
            title: 'text2',
            editText: 'text2',
            completed: true,
            editing: true,
        }
        expect(sectodo.props()).toMatchObject(secprops);  
        sectodo.props().onDestroy();
        // expect(props.onDestroy.mock.calls.length).toBe(1)
        // expect(props.onDestroy).toHaveBeenCalled()
        expect(props.onDestroy).toHaveBeenCalled()
        sectodo.props().handleEdit();
        expect(props.handleEdit.mock.calls.length).toBe(1)
    });

})
