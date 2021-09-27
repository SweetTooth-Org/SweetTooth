import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class OrderHistoryButton extends React.Component {

  render() {
    return (
      <Link to={`/orderslist`}>
        <span>Order History</span>
      </Link>

    )
  }
}

export default connect(null)(OrderHistoryButton)
