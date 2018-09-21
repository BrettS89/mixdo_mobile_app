import { connect } from 'react-redux';
import { addTodo, closeModal } from '../store/actions/addTodo';
import { getMyTodos } from '../store/actions/getMyTodos';
import { finishTodo } from '../store/actions/finishTodo';
import { getUserHistory } from '../store/actions/getUserHistory';
import { getAwsUrl } from '../store/actions/getAwsUrl';
import Profile from '../components/profile/Profile';

function mapStateToProps(state) {
  return {
    state: {
      todo: state.addTodo,
      todos: state.getMyTodos,
      finishedTodo: state.finishTodo,
      todoHistory: state.getUserHistory,
      awsUrl: state.getAwsUrl,
    }
  };
}

export default connect(mapStateToProps, { addTodo, getMyTodos, closeModal, finishTodo, getUserHistory, getAwsUrl })(Profile);
