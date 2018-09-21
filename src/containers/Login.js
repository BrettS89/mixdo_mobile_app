import Login from '../components/login/Login';
import { connect } from 'react-redux';
import { login } from '../store/actions/login';

function mapStateToProps({ login }) {
  return {
    state :{
      login
    }
  };
}

export default connect(mapStateToProps, { login })(Login);
