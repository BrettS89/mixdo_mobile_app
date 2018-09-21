import { connect } from 'react-redux';
import MyFriends from '../components/my_friends/MyFriends';
import { getFollowers } from '../store/actions/getFollowers';
import { getFollowing } from '../store/actions/getFollowing';
import { getUserProfile } from '../store/actions/getUserProfile';


function mapStateToProps(state) {
  return {
    state: {
      followers: state.getFollowers,
      following: state.getFollowing,
    }
  };
}

export default connect(mapStateToProps, { getFollowers, getFollowing, getUserProfile })(MyFriends);
