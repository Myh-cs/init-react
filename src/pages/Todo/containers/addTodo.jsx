import { AddTodo } from '../components/addTodo.jsx';
import { connect } from 'react-redux';
import { addTodo } from '../store/todo.reducer.js';

const mapDispatchToProps = dispatch => ({
    onSubmit: () => dispatch(addTodo)
})
export default connect(state => state, mapDispatchToProps)(AddTodo)