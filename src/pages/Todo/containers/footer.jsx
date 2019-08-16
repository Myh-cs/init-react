import { connect } from 'react-redux'
import Footer from '../components/footer'
import { setVisibilityFilter } from '../store/todo.action.js';
const mapStateToProps = (state) => {
    return ({
        filter: state.todo.visibilityFilter
    })
}

export default connect(
    mapStateToProps,
    { setVisibilityFilter }
)(Footer)
