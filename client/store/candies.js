import axios from 'axios';
import { setSingleCandy } from './singleCandy';
const TOKEN = 'token';
const token = window.localStorage.getItem(TOKEN);

// Action Types
const SET_CANDIES = 'SET_CANDIES';
const DELETE_SINGLE_CANDY = 'DELETE_SINGLE_CANDY';
const ADD_SINGLE_CANDY = 'ADD_SINGLE_CANDY';

// Action Creators
const setCandies = (candies) => {
  return {
    type: SET_CANDIES,
    candies,
  };
};

const deleteSingleCandy = (candyId) => {
  return {
    type: DELETE_SINGLE_CANDY,
    candyId,
  };
};
const addSingleCandy = (candy) => {
  return {
    type: ADD_SINGLE_CANDY,
    candy,
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
      if (token) {
        await axios.delete(`/api/candies/${candyId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(deleteSingleCandy(candyId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const submitNewCandy = (newCandyObj) => {
  return async function (dispatch) {
    try {
      if (token) {
        const { data } = await axios.post('/api/candies', newCandyObj, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addSingleCandy(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateCandy = (candyId, candyInfo) => {
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
        dispatch(setSingleCandy(data));
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
    case ADD_SINGLE_CANDY:
      return [...candies, action.candy];
    case DELETE_SINGLE_CANDY:
      return candies.filter((candy) => candy.id !== action.candyId);
    default:
      return candies;
  }
}
