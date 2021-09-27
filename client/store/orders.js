import axios from 'axios'
const TOKEN = 'token'
const token = window.localStorage.getItem(TOKEN)

//ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'

//ACTION CREATORS
export const _setOrders = (orders) => ({
  type: SET_ORDERS,
  orders
})

//THUNK CREATORS
export const setOrders = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/orders/fulfilled/${id}`, {
      headers: {
        authorization: token
      }
    })
    dispatch(_setOrders(data))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER

const initialState = []
export default function (orders = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return orders
  }
}
