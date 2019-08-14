const initialState = {

}
let nextTodoId = 0;
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

export default function todo(state = initialState, action = {}) {
    return state;
}