import { connect } from 'react-redux';
import { getTodos } from '../store/actions/getTodos';
import { infinityTodos } from '../store/actions/infinityTodos';
import { getUserProfile } from '../store/actions/getUserProfile';
import { likeTodo } from '../store/actions/likeTodo';
import { addUserTodo } from '../store/actions/addUserTodo';
import Feed from '../components/feed/Feed';

function mapStateToProps({ todos, infinityTodos, likeTodo, addUserTodo }) {
  return {
    todos,
    infinity: infinityTodos,
    likedTodo: likeTodo,
    addedTodo: addUserTodo
  };
}

export default connect(mapStateToProps, { getTodos, infinityTodos, getUserProfile, likeTodo, addUserTodo })(Feed);
