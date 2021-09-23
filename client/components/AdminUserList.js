import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

//A List of users generated for the Admin
//These are random users generated by faker.js

class AdminUserList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const users = this.props.users;
    return (
      <div>
        <div className="admin-user-list">
          {users.map(function (user) {
            return (
              <div key={user.id} className="admin-user-div">
                <div>{`User ID: ${user.id} UserName: ${user.username}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
const mapState = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapState, mapDispatch)(AdminUserList);