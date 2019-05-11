import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const currentUserProfile = {
      pathname: '/profile',
      state: localStorage.currentUserName
    };
    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <div className='nav-link'>
            <Link to={currentUserProfile}>
              <img
                className='rounded-circle'
                src='https://www.gravatar.com/avatar/anything?s=200&d=mm'
                alt=''
                title={user.username}
                style={{ width: '25px', marginRight: '5px' }}
              />
            </Link>
            <Link
              to='/'
              onClick={this.onLogoutClick.bind(this)}
              className='logout'>
              {'  '}
              Logout
            </Link>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
          <div className='container'>
            <Link className='navbar-brand' to='/home'>
              Columbia Forum
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'>
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profiles'>
                    {' '}
                    Friends{' '}
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
