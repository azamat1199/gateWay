import { SET_DOC } from '../actionTypes';

const initialState = {
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOC:
      return { ...state, data: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
