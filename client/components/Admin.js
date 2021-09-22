import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandies } from '../store/candies';
import AdminSingleCandy from './AdminSingleCandy';
import AdminAddCandyForm from './AdminCandyForm';
import { Link } from 'react-router-dom';

//This Admin page is only avaialble after a user has logged in. Later we will have to be able to check if that user is an admin.
//This page can either show 'all candies' or show a 'add candy form' depending on if the 'add button' has been pressed.
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCandies: true,
      add: false,
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    this.setState({
      allCandies: false,
      add: true,
    });
  }
  componentDidMount() {
    this.props.loadCandies();
  }
  render() {
    //This is some logic to decide if we should render all the candies or a add candy form
    //The result is placed in 'toRender' variable. 'toRender' is then placed in the return, so 'toRender' is dynamic
    const candies = this.props.candies;
    let toRender;
    let button;
    if (this.state.allCandies) {
      button = (
        <Link to="/addCandy">
          <button onClick={this.handleAdd} className="admin-add-candy-btn">
            Add Candy
          </button>
        </Link>
      );
      toRender = (
        <div>
          <div className="admin-candy-list">
            {candies.map(function (candy) {
              return (
                <div className="admin-candy" key={candy.id}>
                  <AdminSingleCandy candy={candy} />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (this.state.add) {
      button = <div></div>;
      toRender = <AdminAddCandyForm title={'Add a candy to the database'} />;
    }
    return (
      <React.Fragment>
        <header className="admin-header">
          <Link to="/users">
            <button className="admin-users-btn">View Users List</button>
          </Link>
          <h1>Admin Page</h1>
          {button}
        </header>
        <div>{toRender}</div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    candies: state.candies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
  };
};

export default connect(mapState, mapDispatch)(Admin);
