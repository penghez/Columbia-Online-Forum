import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      bio: '',
      hobbies: [],
      grade: '',
      school: '',
      fieldOfStudy: '',
      friends: [],
      hobbiesElements: [],
      friendsElements: []
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.setFriendsElements = this.setFriendsElements.bind(this);
    this.setHobbiesElements = this.setHobbiesElements.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const profileUserName = this.props.location.state;
    axios
      .get('/forum-user', {
        params: {
          username: profileUserName
        }
      })
      .then(res => {
        console.log(res.data);
        const userInfo = res.data;
        for (let key in userInfo) {
          this.setState({ [key]: userInfo[key] });
        }
        this.setHobbiesElements();
        this.setFriendsElements();
      })
      .catch(err => {
        console.log(err);
      });
  }

  setFriendsElements() {
    const tmpElements = [];
    for (let f in this.state.friends) {
      tmpElements.push(
        <li className='list-group-item' key={this.state.friends[f]}>
          {this.state.friends[f]}
        </li>
      );
    }
    this.setState({ friendsElements: tmpElements });
  }

  setHobbiesElements() {
    const tmpElements = [];
    for (let h in this.state.hobbies) {
      tmpElements.push(
        <div className='p-3' key={this.state.hobbies[h]}>
          <i className='fa fa-check' />
          {this.state.hobbies[h]}
        </div>
      );
    }
    this.setState({ hobbiesElements: tmpElements });
  }

  addFriend(e) {
    e.preventDefault();

    axios
      .post('/forum-user', {
        username: localStorage.currentUserName,
        friends: this.state.username
      })
      .catch(err => console.log(err));
  }

  render() {
    const profileName = this.state.username;

    return (
      <div className='row'>
        <div className='col-md-12'>
          {localStorage.currentUserName !== profileName && (
            <div className='row'>
              <div className='col-6'>
                <button
                  className='btn btn-light mb-3 float-left'
                  onClick={this.addFriend}>
                  Add Friend
                </button>
              </div>
              <div className='col-6' />
            </div>
          )}
          <div className='row'>
            <div className='col-md-12'>
              <div className='card card-body bg-info text-white mb-3'>
                <div className='row'>
                  <div className='col-4 col-md-3 m-auto'>
                    <img className='rounded-circle' src='' alt='' />
                  </div>
                </div>
                <div className='text-center'>
                  <h1 className='display-4 text-center'>
                    {this.state.username}
                  </h1>
                  <p className='lead text-center'>
                    {this.state.grade} at {this.state.school}
                  </p>

                  <p>
                    <Link className='text-white p-2' to='#'>
                      <i className='fab fa-twitter fa-2x' />
                    </Link>
                    <Link className='text-white p-2' to='#'>
                      <i className='fab fa-facebook fa-2x' />
                    </Link>
                    <Link className='text-white p-2' to='#'>
                      <i className='fab fa-linkedin fa-2x' />
                    </Link>
                    <Link className='text-white p-2' to='#'>
                      <i className='fab fa-instagram fa-2x' />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <div className='card card-body bg-light mb-3'>
                <h3 className='text-center text-info'>User's Bio</h3>
                <p className='lead'>{this.state.bio}</p>
                <hr />
                <h3 className='text-center text-info'>Hobbies</h3>
                <div className='row'>
                  <div className='d-flex flex-wrap justify-content-center align-items-center' />
                  {this.state.hobbiesElements}
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <h3 className='text-center text-info'>Education</h3>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <h4>{this.state.school}</h4>
                  <br />
                  <p>
                    <strong>Grade: </strong>
                    {this.state.grade}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {this.state.fieldOfStudy}
                  </p>
                </li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h3 className='text-center text-info'>Friends</h3>
              <ul className='list-group'>{this.state.friendsElements}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
