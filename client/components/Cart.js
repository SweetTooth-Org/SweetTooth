import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render () {
    return (
    <span>
      Cart {''}
    </span>
    )
  }
}

export default connect(null)(Cart)
