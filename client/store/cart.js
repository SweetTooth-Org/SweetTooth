import axios from "axios"

//ACTION TYPES
const SET_CART_COUNT = "SET_CART_COUNT"

//ACTION CREATORS
export const setCartCount = (cartCount) => ({
  type: SET_CART_COUNT,
  cartCount
})

//THUNK CREATORS
export const fetchCartCount = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/')
  } catch (error) {
    conso.elog(error)
  }
}
