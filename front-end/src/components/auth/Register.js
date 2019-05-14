import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, confirmRegister } from '../../actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      confirmationCode: '',
      error: '',
      verified: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error['message'],
        verified: false
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { verified } = this.state;

    e.preventDefault();

    if (verified) {
      const confirmUser = {
        username: this.state.username,
        code: this.state.confirmationCode
      };
      this.props.confirmRegister(confirmUser, this.props.history);
      this.setState({
        confirmationCode: ''
      });
    } else {
      const newUser = {
        username: this.state.username,
        password: this.state.password,
        attributes: {
          phone_number: this.state.phoneNumber,
          email: this.state.email
        }
      };

      this.props.registerUser(newUser);
      this.setState({
        password: '',
        email: '',
        phoneNumber: '',
        verified: true
      });
    }

    e.target.reset();
  }

  render() {
    const { verified, error } = this.state;

    if (verified) {
      return (
        <div className='register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Sign Up</h1>
                <p className='lead text-center'>
                  Create your Columbia Forum account
                </p>
                <p className='text-center text-muted'>
                  Authenticated by AWS Cognito and Amplify
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder={this.state.username}
                      name='username'
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Confirmation Code'
                      name='confirmationCode'
                      value={this.state.confirmationCode}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Sign Up</h1>
                <p className='lead text-center'>
                  Create your Columbia Forum account
                </p>
                <p className='text-center text-muted'>
                  Authenticated by AWS Cognito and Amplify
                </p>
                <p className='text-center text-danger'>{error}</p>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Name'
                      name='username'
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control form-control-lg'
                      placeholder='Email Address'
                      name='email'
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className='form-control form-control-lg'
                      placeholder='Password'
                      name='password'
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      data-format='+1 (ddd) ddd-dddd'
                      placeholder='Phone number'
                      name='phoneNumber'
                      value={this.state.phoneNumber}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { registerUser, confirmRegister }
)(withRouter(Register));
