import { ADD_TODO, OPEN_MODAL, CLOSE_MODAL } from '../actions/action_types';

export default function(state = {}, { type, payload }) {
  switch(type) {

    case OPEN_MODAL:
      return {
        ...state,
        openModal: true
      };

    case CLOSE_MODAL:
      return {
        ...state,
        openModal: false
      };
    
    case ADD_TODO:
      return {
        ...state,
        openModal: false,
        payload
      };

    default:
      return state;
  }
}
