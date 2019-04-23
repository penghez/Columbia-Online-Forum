import React, { Component } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';

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
    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }

  signUp() {
    const { username, password, email, phoneNumber } = this.state;
    console.log(this.state);
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        phone_number: phoneNumber
      }
    })
      .then(() => {
        console.log('Successfully signed up');
        this.setState({ error: '' });
      })
      .catch(err => {
        this.setState({ error: err['message'] });
        console.log(err);
      });
  }

  confirmSignUp() {
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode)
      .then(() => {
        console.log('Successfully confirmed signed up');
        this.setState({ error: '' });
        this.props.handleSignUp(this.state);
        this.props.history.push('/home');
      })
      .catch(err => {
        this.setState({ error: err['message'] });
        console.log(err);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { verified, error } = this.state;

    e.preventDefault();

    if (error == '' && verified) {
      this.confirmSignUp();
      this.setState({
        confirmationCode: '',
        username: ''
      });
    } else {
      this.signUp();
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

    if (error == '' && verified) {
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

export default Register;
