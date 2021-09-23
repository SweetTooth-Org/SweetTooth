import axios from 'axios';
import { setSingleCandy } from './singleCandy';
const TOKEN = 'token';

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
  const token = window.localStorage.getItem(TOKEN);
  let updatedCandyList;
  return async function (dispatch) {
    try {
      if (token) {
        updatedCandyList = await axios.delete(`/api/candies/${candyId}`, {
          headers: {
            authorization: token,
          },
        });
      }
      dispatch(setCandies(updatedCandyList.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const submitNewCandy = (newCandyObj) => {
  const token = window.localStorage.getItem(TOKEN);
  let updatedCandyList;
  return async function (dispatch) {
    try {
      if (token) {
        updatedCandyList = await axios.post('/api/candies', newCandyObj, {
          headers: {
            authorization: token,
          },
        });
      }
      dispatch(setCandies(updatedCandyList.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateCandy = (candyId, candyInfo) => {
  const token = window.localStorage.getItem(TOKEN);
  return async function (dispatch) {
    try {
      if (token) {
        const { data } = await axios.put(
          '/api/candies/',
          {
            candyId,
            candyInfo,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(setCandies(data.newCandyList));
        dispatch(setSingleCandy(data.singleCandy));
      }
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
