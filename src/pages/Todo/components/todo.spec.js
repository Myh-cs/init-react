import React from 'react'
import { shallow } from 'enzyme'
import Todo from './todo.jsx'

const setup = (props) => {
    
    let component = shallow(
        <Todo {...props} />
    )
    return {
        wrapper: component,
        toggle: component.find('.toggle'),
        label: component.find('label'),
        edit: component.find('.edit'),
        destroy: component.find('.destroy'),
    }
}

describe('<Todo/>', () => {
    it('should render title', () => {
        const { label } = setup({ title: 'Test Title' })
        expect(label.contains('Test Title'))
    });
    it('should render editText', () => {
        const { edit } = setup({ editText: 'Test editText' })
        expect(edit.contains('Test editText'))
    });
    it('edit input on change', () => {
        const handleChange = jest.fn();
        const { edit } = setup({ handleChange: handleChange });
        edit.simulate('change');
        expect(handleChange).toHaveBeenCalled();
    });
    it('edit input on keydown', () => {
        const handleKeyDown = jest.fn();
        const { edit } = setup({ handleKeyDown: handleKeyDown });
        edit.simulate('keydown');
        expect(handleKeyDown).toHaveBeenCalled();
    });
    it('toggle input on change', () => {
        const onChange = jest.fn();
        const { toggle } = setup({ onToggle: onChange });
        toggle.simulate('change');
        expect(onChange).toHaveBeenCalled();
    });
    it('label on edit', () => {
        const onDoubleClick = jest.fn();
        const { label } = setup({ handleEdit: onDoubleClick });
        label.simulate('dblclick');
        expect(onDoubleClick).toHaveBeenCalled();
    });
    it('button on destory', () => {
        const onClick = jest.fn();
        const { destroy } = setup({ onDestroy: onClick });
        destroy.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    describe('when given completed and editing', () => {
 
        it('class li should be completed editing', () => {
            const props = {
                completed: true,
                editing: true
            }
            const { wrapper } = setup(props);
            expect(wrapper.hasClass('completed editing')).toEqual(true)
        })

        it('class li should be completed', () => {
            const props = {
                completed: true,
                editing: false
            }
            const { wrapper } = setup(props);
            expect(wrapper.hasClass('completed')).toEqual(true)
        })
        it('class li should be editing', () => {
            const props = {
                completed: false,
                editing: true
            }
            const { wrapper } = setup(props);
            expect(wrapper.hasClass('editing')).toEqual(true)
        })
        it('class li should be blank', () => {
            const props = {
                completed: false,
                editing: false
            }
            const { wrapper } = setup(props);
            expect(wrapper.hasClass('editing')).toEqual(false)
            expect(wrapper.hasClass('completed')).toEqual(false)
            expect(wrapper.hasClass('completed editing')).toEqual(false)
        })
    });
})
