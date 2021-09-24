import axios from 'axios';

const TOKEN = 'token';
const token = window.localStorage.getItem(TOKEN);

// Action Types
const SET_USERS = 'SET_USERS';

// Action Creators
const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

// Thunk Creators
export const fetchUsers = function () {
  return async function (dispatch) {
    try {
      if (token) {
        const { data } = await axios.get('/api/users', {
          headers: {
            authorization: token,
          },
        });
        return dispatch(setUsers(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Reducer & Initial State
const initialState = [];

export default function (users = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return users;
  }
}
