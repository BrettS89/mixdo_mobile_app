import { ADD_COMMENT, GET_COMMENTS, INFINITY_COMMENTS } from './action_types';
import { apiAddComment, apiGetComments } from '../../lib/api_calls';

export async function addComment({ id, content, currentComments }) {
  const res = await apiAddComment({ id, content, date: new Date(Date.now()).toString() });
  currentComments.comments = [...currentComments.comments ,res.comment];
  return {
    type: ADD_COMMENT,
    payload: currentComments,
  };
}

export function getComments(id) {
  const res = apiGetComments(id);

  return {
    type: GET_COMMENTS,
    payload: res,
  };
}

export function infinityComments() {
  const res = 'placeholder';

  return {
    type: INFINITY_COMMENTS,
    payload: res,
  };
}

