import { connect } from 'react-redux';
import { getNotifications } from '../store/actions/getNotifications'
import Notifications from '../components/notifications/Notifications';

function mapStateToProps(state) {
  return {
    state: {
      notifications: state.getNotifications
    }
  };
}

export default connect(mapStateToProps, { getNotifications })(Notifications);
