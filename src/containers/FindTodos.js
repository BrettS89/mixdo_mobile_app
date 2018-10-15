import { connect } from 'react-redux';
import { discoverTodos } from '../store/actions/discoverTodos';
import { getUserProfile } from '../store/actions/getUserProfile';
import { searchTodos } from '../store/actions/searchTodos';
import { likeTodo } from '../store/actions/likeTodo';
import { addUserTodo } from '../store/actions/addUserTodo';
import { infinityDiscover } from '../store/actions/infinityDiscover';
import { getFollowers } from '../store/actions/getFollowers';
import { flagTodo } from '../store/actions/flagTodo';
import FindTodos from '../components/find_todos/FindTodos';

function mapStateToProps(state) {
  return {
    todos: state.discoverTodos,
    searchedTodos: state.searchTodos,
    likeTodo: state.likedTodo,
    addedTodo: state.addUserTodo,
    infinityDiscovered: state.infinityDiscover,
    flaggedTodo: state.flagTodo,
  };
}

export default connect(mapStateToProps, { discoverTodos, 
                                          getUserProfile, 
                                          searchTodos, 
                                          likeTodo, 
                                          addUserTodo, 
                                          infinityDiscover,
                                          getFollowers,
                                          flagTodo,
                                         })(FindTodos);
