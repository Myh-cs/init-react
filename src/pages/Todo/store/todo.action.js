let nextTodoId = 0;
export const handleAddTodo = text => (dispatch) => {
    dispatch({
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    });
}
export const onToggle = id => (dispatch) => {
    dispatch({
        type: 'ON_TOGGLE',
        id: id
    })
}
 
export const onDestroy = id => (dispatch) => {
    dispatch({
        type: 'ON_DESTROY',
        id: id
    })
}

export const handleEdit = id => (dispatch) => {
    dispatch({
        type: 'HANDLE_EDIT',
        id: id
    })
}

export const setVisibilityFilter = filter => (dispatch) => {
    console.log('==', filter)
    dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    })
}
