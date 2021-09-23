import axios from "axios"

const CREATE_CANDY_ORDER = "CREATE_CANDY_ORDER"
const UPDATE_CANDY_QUANTITY = "UPDATE_CANDY_QUANTIY"
const CHECKOUT_CANDY_ORDERS = "CHECKOUT_CANDY_ORDERS"

export const _createCandyOrder = (candyOrder) => ({
  type: CREATE_CANDY_ORDER,
  candyOrder
})

export const _updateCandyQuantity = (candyOrder) => ({
  type: UPDATE_CANDY_QUANTITY,
  candyOrder
})

export const _checkoutCandyOrders = () => ({
  type: CHECKOUT_CANDY_ORDERS,
  payload: []
})

export const createCandyOrder = (candyOrder) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/candyOrders', candyOrder)
    dispatch(_createCandyOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateCandyQuantity = (candyOrder) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/candyOrders', candyOrder)
    dispatch(_updateCandyQuantity(data))
  } catch (error) {
    console.log(error)
  }
}

export const checkoutCandyOrders = () => async (dispatch) => {
  try {
    dispatch(_checkoutCandyOrders())
  } catch (error) {
    console.log(error)
  }
}

const initialState = []
export default function (candyOrders = initialState, action) {
  switch (action.type) {
    case CREATE_CANDY_ORDER:
      return [...candyOrders, action.candyOrder]
    case UPDATE_CANDY_QUANTITY:
      return candyOrders.map((candyOrder) => {
        return (candyOrder.candyId === action.candyOrder.candyId) ?  action.candyOrder : candyOrder
      })
    case CHECKOUT_CANDY_ORDERS:
      return action.payload
    default:
      return candyOrders
  }
}
