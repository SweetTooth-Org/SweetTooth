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

export const deleteCandy = function (candyId) {
  return async function (dispatch) {
    try {
      const updatedCandyList = await axios.delete('/api/candies/deleteCandy', {
        data: { candyId },
      });
      dispatch(setCandies(updatedCandyList.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const submitNewCandy = (newCandyObj) => {
  return async function (dispatch) {
    try {
      const updatedCandyList = await axios.post(
        '/api/candies/createCandy',
        newCandyObj
      );
      dispatch(setCandies(updatedCandyList.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateCandy = (candyId, candyInfo) => {
  return async function (dispatch) {
    try {
      const updatedCandyList = await axios.put('/api/candies/updateCandy', {
        candyId,
        candyInfo,
      });
      dispatch(setCandies(updatedCandyList.data));
    } catch (error) {
      console.log(error);
    }
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
