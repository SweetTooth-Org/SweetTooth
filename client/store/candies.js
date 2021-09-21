import axios from 'axios';

// Action Types
const SET_CANDIES = 'SET_CANDIES';

// Action Creators
const setCandies = (candies) => {
  return {
    type: SET_CANDIES,
    candies,
  };
};

// Thunk Creators
export const fetchCandies = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/candies');
    return dispatch(setCandies(data));
  };
};

// Reducer & Initial State
const initialState = [];

export default function (candies = initialState, action) {
  switch (action.type) {
    case SET_CANDIES:
      return [...action.candies];
    default:
      return candies;
  }
}
