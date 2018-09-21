import { GET_AWS_URL } from './action_types';
import { apiGetAwsUrl } from '../../lib/api_calls';

export function getAwsUrl(type) {
  const res = apiGetAwsUrl(type);

  return {
    type: GET_AWS_URL,
    payload: res,
  };
}
