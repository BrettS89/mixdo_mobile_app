import { SEARCH_TODOS } from './action_types';
import { apiSearchTodos } from '../../lib/api_calls';

export function searchTodos(search) {
  const res = apiSearchTodos(search);

  return {
    type: SEARCH_TODOS,
    payload: res
  };
}
