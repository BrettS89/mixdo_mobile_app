import PublicTodos from '../components/publicTodos/PublicTodos';
import { connect } from 'react-redux';
import { getPublicTodos } from '../store/actions/getPublicTodos';

function mapStateToProps(state) {
  return {
    state: {
      publicTodos: state.publicTodos
    }
  };
}

export default connect(mapStateToProps, { getPublicTodos })(PublicTodos);
