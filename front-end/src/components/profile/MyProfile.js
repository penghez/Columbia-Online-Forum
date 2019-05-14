import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

class MyProfile extends Component {
  constructor() {
    super();

    this.state = {
      school: '',
      username: localStorage.currentUserName,
      hobbies: '',
      grade: '',
      bio: '',
      fieldOfStudy: '',
      showNetworkLinks: false
    };

    this.profileChange = this.profileChange.bind(this);
    this.submitMyProfile = this.submitMyProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    axios
      .get(
        'https://pfuel2ck1b.execute-api.us-east-2.amazonaws.com/api/forum-user',
        {
          params: {
            username: this.state.username
          }
        }
      )
      .then(res => {
        console.log(res.data);
        const userInfo = res.data;
        for (let key in userInfo) {
          if (key === 'hobbies') {
            console.log(userInfo[key].join(', '));
            this.setState({ [key]: userInfo[key].join(', ') });
          } else if (key in this.state) {
            this.setState({ [key]: userInfo[key] });
          }
        }
      })
      .catch(err => console.log(err));
  }

  profileChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitMyProfile(e) {
    e.preventDefault();

    axios
      .post(
        'https://pfuel2ck1b.execute-api.us-east-2.amazonaws.com/api/forum-user',
        this.state
      )
      .then(res => {
        const myProfileParam = {
          pathname: '/profile',
          state: localStorage.currentUserName
        };
        this.props.history.push(myProfileParam);
      })
      .catch(err => console.log(err));
  }

  render() {
    const myProfileParam = {
      pathname: '/profile',
      state: localStorage.currentUserName
    };
    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to={myProfileParam} className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Edit Your Profile</h1>
              <p className='lead text-center'>
                Let's get some information to make your profile stand out
              </p>
              <small className='d-block pb-3'>* = required field</small>
              <form onSubmit={this.submitMyProfile}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder={
                      isEmpty(this.state.school)
                        ? '* School'
                        : this.state.school
                    }
                    name='school'
                    onChange={this.profileChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder={
                      isEmpty(this.state.fieldOfStudy)
                        ? '* Field Of Study'
                        : this.state.fieldOfStudy
                    }
                    name='fieldOfStudy'
                    onChange={this.profileChange}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='grade'
                    onChange={this.profileChange}>
                    <option value='0'>
                      {isEmpty(this.state.grade)
                        ? '* Select Grade'
                        : this.state.grade}
                    </option>
                    <option value='Freshman'>Freshman</option>
                    <option value='Sophomore'>Sophomore</option>
                    <option value='Junior'>Junior</option>
                    <option value='Senior'>Senior</option>
                    <option value='Master'>Master</option>
                    <option value='Phd'>Phd</option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Other'>Other</option>
                  </select>
                  <small className='form-text text-muted'>
                    Talk about your education experience
                  </small>
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder={
                      isEmpty(this.state.hobbies)
                        ? 'Hobbies'
                        : this.state.hobbies
                    }
                    name='hobbies'
                    onChange={this.profileChange}
                  />
                  <small className='form-text text-muted'>
                    Please use comma separated values
                  </small>
                </div>

                <div className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    placeholder={
                      isEmpty(this.state.bio)
                        ? 'A short bio of yourself'
                        : this.state.bio
                    }
                    name='bio'
                    onChange={this.profileChange}
                  />
                  <small className='form-text text-muted'>
                    Tell us a little about yourself
                  </small>
                </div>

                <div className='mb-3'>
                  <button
                    type='button'
                    className='btn btn-light'
                    onClick={() => {
                      this.setState({
                        showNetworkLinks: !this.state.showNetworkLinks
                      });
                    }}>
                    Add Social Network Links
                  </button>
                  <span className='text-muted'>{'  '}Optional</span>
                </div>

                {this.state.showNetworkLinks && (
                  <div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='fab fa-twitter' />
                        </span>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Twitter Profile URL'
                        name='twitter'
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='fab fa-facebook' />
                        </span>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Facebook Page URL'
                        name='facebook'
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='fab fa-linkedin' />
                        </span>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='fab fa-instagram' />
                        </span>
                      </div>
                      <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Instagram Page URL'
                        name='instagram'
                      />
                    </div>
                  </div>
                )}
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
