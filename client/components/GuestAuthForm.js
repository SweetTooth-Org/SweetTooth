import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const GuestAuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  let email;
  if (displayName === 'Sign Up') {
    email = (
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>
    );
  } else {
    email = <React.Fragment></React.Fragment>;
  }
  return (
    <React.Fragment>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          {email}
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </React.Fragment>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
    auth: state.auth,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      // Prevent reload page
      evt.preventDefault();
      // Sign Up / Login user
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email ? evt.target.email.value : '';
      dispatch(authenticate(username, password, formName, email));
    },
  };
};

export const GuestLogin = connect(mapLogin, mapDispatch)(GuestAuthForm);
export const GuestSignup = connect(mapSignup, mapDispatch)(GuestAuthForm);