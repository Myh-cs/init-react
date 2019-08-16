import TodoList from '../components/todoList.jsx'
import { connect } from 'react-redux';
import {
    onToggle,
    onDestroy,
    handleEdit
} from '../store/todo.action.js';
const mapStateToProps = (state) => ({ todos: state.todo.todos });

export default connect(mapStateToProps, {
    onToggle,
    onDestroy,
    handleEdit
})(TodoList)