import { combineReducers } from 'redux';
import login from './login';
import signup from './signup';
import addTodo from './addTodo';
import getMyTodos from './getMyTodos';
import todos from './todos';
import findUsers from './findUsers';
import getFollowers from './getFollowers';
import getFollowing from './getFollowing';
import followUser from './followUser';
import unfollowUser from './unfollowUser'
import getNotifications from './getNotifications';
import infinityTodos from './infinityTodos';
import discoverTodos from './discoverTodos';
import getMyProfile from './getMyProfile';
import getUserProfile from './getUserProfile';
import searchUser from './searchUser';
import searchTodos from './searchTodos';
import likeTodo from './likeTodo';
import addUserTodo from './addUserTodo';
import finishTodo from './finishTodo';
import infinityDiscover from './infinityDiscover';
import getUserHistory from './getUserHistory';
import findUsersInfinite from './findUsersInfinite';
import getAwsUrl from './getAwsUrl';
import deleteUser from './deleteUser';
import flagTodo from './flagTodo';

const rootReducer = combineReducers({
  login,
  signup,
  addTodo,
  getMyTodos,
  todos,
  findUsers,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getNotifications,
  infinityTodos,
  discoverTodos,
  getMyProfile,
  getUserProfile,
  searchUser,
  searchTodos,
  likeTodo,
  addUserTodo,
  finishTodo,
  infinityDiscover,
  getUserHistory,
  findUsersInfinite,
  getAwsUrl,
  deleteUser,
  flagTodo,
});

export default rootReducer;
