import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleCandy from './components/SingleCandy';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import AdminCandyForm from './components/AdminCandyForm';
import AdminUserList from './components/AdminUserList';
import Confirmation from './components/Confirmation';
import GuestCheckout from './components/GuestCheckout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    //I added a few routes that are part of the Admin View. Makes it easy to go back in history. Later we will have to protect these routes from non Admin users
    return (
      <div>
        {isAdmin ? (
          <Switch>
            <Route path="/users" component={AdminUserList} />
            <Route path="/addCandy" component={AdminCandyForm} />
            <Route path="/edit/:candyId" component={AdminCandyForm} />
            <Route path="/admin" component={Admin} />
            <Redirect to="/admin" />
          </Switch>
        ) : isLoggedIn ? (
          <Switch>
            <Route path="/candies/:candyId" component={SingleCandy} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/checkout" component={GuestCheckout} />
            <Route path="/candies/:candyId" component={SingleCandy} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
