import { connect } from 'react-redux';
import Comments from '../components/Comments/Comments';
import { addComment } from '../store/actions/comments';

function mapStateToProps(state) {
  return {
    state: {
      comments: state.comments,
    }
  };
}

export default connect(mapStateToProps, { addComment })(Comments);
