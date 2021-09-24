import axios from 'axios'
const TOKEN = 'token'
const token = window.localStorage.getItem(token)

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

  } catch (error) {
    console.log(error)
  }
}
