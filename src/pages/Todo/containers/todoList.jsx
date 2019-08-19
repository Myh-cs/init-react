import TodoList from '../components/todoList.jsx'
import { connect } from 'react-redux';
import {
    onToggle,
    onDestroy,
    handleEdit
} from '../store/todo.action.js';
import { xxxx } from '../store/todo.reducer.js';
const mapStateToProps = (state) => ({ todos: xxxx(state.todo.todos, state.todo.xxx) });

export default connect(mapStateToProps, {
    onToggle,
    onDestroy,
    handleEdit
})(TodoList)