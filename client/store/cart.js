import axios from 'axios';
const TOKEN = 'token';
const token = window.localStorage.getItem(TOKEN);

//ACTION TYPES
// const SET_CART_COUNT = "SET_CART_COUNT"
const SET_CART = 'SET_CART';
const CREATE_CART = 'CREATE_CART';
const CHECKOUT_CART = 'CHECKOUT_CART';
const LOGOUT_CART = 'LOGOUT_CART'

//ACTION CREATORS
// export const setCartCount = (cartCount) => ({
//   type: SET_CART_COUNT,
//   cartCount
// })

export const _setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const _createCart = (cart) => ({
  type: CREATE_CART,
  cart,
});

export const _checkoutCart = (cart) => ({
  type: CHECKOUT_CART,
  cart,
});

export const _logoutCart = () => ({
  type: LOGOUT_CART,
  payload: {}
})

//THUNK CREATORS
// export const fetchCartCount = () => async (dispatch) => {
//   try {

//   } catch (error) {
//     console.log(error)
//   }
// }

export const setCart = (id) => async (dispatch) => {
  try {
    if (token) {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_setCart(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCart = (order) => async (dispatch) => {
  try {
    if (token) {
      const { data } = await axios.post('/api/orders/', order, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_createCart(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkoutCart = (order) => async (dispatch) => {
  try {
    if (token) {
      const { data } = await axios.put('/api/orders/', order, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_checkoutCart(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutCart = () => async (dispatch) => {
  try {
    if (token) {
      dispatch(_logoutCart())
    }
  } catch (error) {
    console.log(error)
  }
}

//REDUCER

const initialState = {};
export default function (cart = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...action.cart };
    case CREATE_CART:
      return { ...action.cart };
    case CHECKOUT_CART:
      return {};
    case LOGOUT_CART:
      return action.payload
    default:
      return cart;
  }
}
