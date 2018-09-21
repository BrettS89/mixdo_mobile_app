import { connect } from 'react-redux';
import FindUsers from '../components/find_users/FindUsers';
import { findUsers } from '../store/actions/findUsers';
import { getFollowers } from '../store/actions/getFollowers';
import { getUserProfile } from '../store/actions/getUserProfile';
import { searchUser } from '../store/actions/searchUser';
import { findUsersInfinite } from '../store/actions/findUsersInfinite';

function mapStateToProps({ findUsers, searchUser, findUsersInfinite }) {
  return {
    users: findUsers,
    searchedUsers: searchUser,
    infiniteUsers: findUsersInfinite
  };
}

export default connect(mapStateToProps, { findUsers, getFollowers, getUserProfile, searchUser, findUsersInfinite })(FindUsers);
