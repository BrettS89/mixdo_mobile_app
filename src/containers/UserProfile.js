import { connect } from 'react-redux';
import { getUserProfile } from '../store/actions/getUserProfile';
import UserProfile from '../components/UserProfile/UserProfile';

function mapStateToProps(state) {
  return {
    state: { profile: state.getUserProfile }
  };
}

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
