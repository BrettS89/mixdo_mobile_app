import { connect } from 'react-redux';
import { signup } from '../store/actions/signup';
import Signup from '../components/signup/Signup';

function mapStateToProps({ signup }) {
  return {
    state :{
      signup
    }
  };
}

export default connect(mapStateToProps, { signup })(Signup);