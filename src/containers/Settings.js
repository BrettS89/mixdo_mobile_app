import { connect } from 'react-redux';
import { getMyProfile } from '../store/actions/getMyProfile';
import { getAwsUrl } from '../store/actions/getAwsUrl';
import Settings from '../components/settings/Settings';

function mapStateToProps(state) {
  return {
    state: {
      profile: state.getMyProfile,
      awsUrl: state.getAwsUrl,
    }
  };
}

export default connect(mapStateToProps, { getMyProfile, getAwsUrl })(Settings);
