import todo from './todo.reducer'

describe('test todo', () => {
    it('should add todo', () => {
        expect(todo({
            todos: []
        }, {
                type: 'ADD_TODO',
                id: 1,
                text: 'text'
            })).toEqual(
                {
                    todos: [
                        {
                            completed: false,
                            id: 1,
                            text: 'text'
                        }
                    ]
                }
            )
    });

    it('should change completed status of todo', () => {
        expect(todo({
            todos: [
               {
                    completed: false,
                    id: 1,
                    text: 'text'
               } 
            ]
        }, {
                type: 'ON_TOGGLE',
                id: 1
            })).toEqual(
                {
                    todos: [
                        {
                            completed: true,
                            id: 1,
                            text: 'text'
                        }
                    ]
                }
            )
    });
    it('should change editing status of todo', () => {
        expect(todo({
            todos: [
                {
                    completed: false,
                    id: 1,
                    text: 'text',
                    editing: false
                }
            ]
        }, {
                type: 'HANDLE_EDIT',
                id: 1
            })).toEqual(
                {
                    todos: [
                        {
                            completed: false,
                            id: 1,
                            text: 'text',
                            editing: true
                        }
                    ]
                }
            )
    });
    
    it('should delete todo', () => {
        expect(todo({
            todos: [
                {
                    completed: false,
                    id: 1,
                    text: 'text'
                }
            ]
        }, {
                type: 'ON_DESTROY',
                id: 1
            })).toEqual(
                {
                    todos: []
                }
            )
    });

})
describe('test footer reducer', () => {
    it('should be all', () => {
        expect(todo({
            visibilityFilter: ''
        }, {
            type: 'SET_VISIBILITY_FILTER',
            filter: 'All' 
        })).toEqual(
            {
                visibilityFilter: 'All'
            }
        )
    });
    it('should be completed', () => {
        expect(todo({
            visibilityFilter: '',
            todos: []
        }, {
                type: 'SET_VISIBILITY_FILTER',
                filter: 'Completed'
            })).toEqual(
                {
                    visibilityFilter: 'Completed',
                    todos: []
                }
            )
    });
    it('should be Active', () => {
        expect(todo({
            visibilityFilter: '',
            todos: []
        }, {
                type: 'SET_VISIBILITY_FILTER',
                filter: 'Active'
            })).toEqual(
                {
                    visibilityFilter: 'Active',
                    todos: []
                }
            )
    })
})