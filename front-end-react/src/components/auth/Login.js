import React, { Component } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(super());
    console.log(this);

    this.state = {
      username: '',
      password: '',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.confirmSignIn = this.confirmSignIn.bind(this);
  }

  signIn() {
    const { username, password } = this.state;
    Auth.signIn({
      username: username,
      password: password
    })
      .then(() => {
        console.log('Successfully signed in');
        this.props.history.push('/home');
      })
      .catch(err => {
        this.setState({ error: err['message'] });
        console.log(err);
      });
  }

  confirmSignIn() {
    const { username } = this.state;
    Auth.confirmSignIn(username)
      .then(() => {
        console.log('Successfully confirmed signed in');
        this.props.handleSignUp(this.state);
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.signIn();
    //  this.confirmSignIn();
    this.setState({
      username: '',
      password: ''
    });
    e.target.reset();
  }

  render() {
    const { error } = this.state;
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>
                Sign in to your Columbia Forum account
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
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
