const actionTypes = {
    'ADD_TODO': 'ADD_TODO',
    'ON_TOGGLE': 'ON_TOGGLE',
    'ON_DESTROY': 'ON_DESTROY',
    'HANDLE_EDIT': 'HANDLE_EDIT',
    'SET_VISIBILITY_FILTER': 'SET_VISIBILITY_FILTER'
}

const initialState = {
    todos: [],
    visibilityFilter: 'All'
}

export default function todo(state = initialState, action = {}) {
    switch (action.type){
        case actionTypes['ADD_TODO']:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }]
            };
        case actionTypes['ON_TOGGLE']:
            return {
                ...state,
                todos: state.todos.map(todo => (todo.id === action.id) ?
                { ...todo, completed: !todo.completed }: todo)
            } 
        case actionTypes['ON_DESTROY']:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        case actionTypes['HANDLE_EDIT']:
            return {
                ...state,
                todos: state.todos.map(todo => (todo.id === action.id) ?
                    { ...todo, editing: !todo.editing } : todo)
            }

        case actionTypes['SET_VISIBILITY_FILTER']:
            let newState;
            switch (action.filter) {
                case 'All':
                     return newState = {
                        ...state,
                        visibilityFilter: 'All'
                    }
                case 'Completed':
                    return newState =  {
                        ...state,
                        visibilityFilter: 'Completed',
                        todos: state.todos.filter(t => t.completed)
                    }
                case 'Active':
                    return newState =  {
                        ...state,
                        visibilityFilter: 'Active',
                        todos: state.todos.filter(t => !t.completed)
                    }
                default:
                    newState =  state
            }
            console.log(newState)
            return newState
        default:
            return state;
            
    }
         
}
