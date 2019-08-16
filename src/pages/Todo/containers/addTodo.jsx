import AddTodo from '../components/addTodo.jsx';
import { connect } from 'react-redux';
import { handleAddTodo } from '../store/todo.action.js';
export default connect(state => state.todo, { handleAddTodo })(AddTodo)