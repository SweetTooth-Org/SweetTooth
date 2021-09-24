import axios from 'axios';

const TOKEN = 'token';

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
export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users');
    return dispatch(setUsers(data));
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
