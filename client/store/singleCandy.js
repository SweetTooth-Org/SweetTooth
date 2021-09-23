import axios from 'axios';

// Action Types
const SET_SINGLE_CANDY = 'SET_SINGLE_CANDY';

// Action Creators
export const setSingleCandy = (singleCandy) => {
  return {
    type: SET_SINGLE_CANDY,
    singleCandy,
  };
};

// Thunk Creators
export const fetchSingleCandy = (candyId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/candies/${candyId}`);
    return dispatch(setSingleCandy(data));
  };
};

// Reducer & Initial State
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CANDY:
      return action.singleCandy;
    default:
      return state;
  }
}
