import { connect } from 'react-redux';
import { getMyProfile } from '../store/actions/getMyProfile';
import { getAwsUrl } from '../store/actions/getAwsUrl';
import Welcome from '../components/Welcome/Welcome';

function mapStateToProps(state) {
  return {
    state: {
      user: state.getMyProfile,
      awsUrl: state.getAwsUrl,
    }
  };
}

export default connect(mapStateToProps, { getMyProfile, getAwsUrl })(Welcome);
