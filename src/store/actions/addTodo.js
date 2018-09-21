import { ADD_TODO, OPEN_MODAL, CLOSE_MODAL } from './action_types';
import { addTodoItem } from '../../lib/api_calls';

export function openModal() {
  return {
    type: OPEN_MODAL,
    payload: 'open modal'
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: 'close modal'
  };
}

export function addTodo(body) {
  const res = addTodoItem(body);

  return {
    type: ADD_TODO,
    payload: res
  };
}