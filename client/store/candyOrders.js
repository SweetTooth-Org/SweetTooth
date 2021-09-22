import axios from "axios"

const CREATE_CANDY_ORDER = "CREATE_CANDY_ORDER"

export const _createCandyOrder = (candyOrder) => ({
  type: CREATE_CANDY_ORDER,
  candyOrder
})

export const createCandyOrder = (candyOrder) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/candyOrders', candyOrder)
    dispatch(_createCandyOrder(data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = []
export default function (candyOrders = initialState, action) {
  switch (action.type) {
    case CREATE_CANDY_ORDER:
      return [...candyOrders, action.candyOrder]
    default:
      return candyOrders
  }
}
