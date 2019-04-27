import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          {/* Edit your profile */}
          <div className='row'>
            <div className='col-6'>
              <a href='profiles.html' className='btn btn-light mb-3 float-left'>
                Back To Profiles
              </a>
            </div>
            <div className='col-6' />
          </div>

          <div className='row'>
            <div className='col-md-12'>
              <div className='card card-body bg-info text-white mb-3'>
                <div className='row'>
                  <div className='col-4 col-md-3 m-auto'>
                    <img className='rounded-circle' src='' alt='' />
                  </div>
                </div>
                <div className='text-center'>
                  <h1 className='display-4 text-center'>User</h1>
                  <p className='lead text-center'>
                    Freshman at Business School
                  </p>

                  <p>
                    <a className='text-white p-2' href='#'>
                      <i className='fas fa-globe fa-2x' />
                    </a>
                    <a className='text-white p-2' href='#'>
                      <i className='fab fa-twitter fa-2x' />
                    </a>
                    <a className='text-white p-2' href='#'>
                      <i className='fab fa-facebook fa-2x' />
                    </a>
                    <a className='text-white p-2' href='#'>
                      <i className='fab fa-linkedin fa-2x' />
                    </a>
                    <a className='text-white p-2' href='#'>
                      <i className='fab fa-instagram fa-2x' />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class='row'>
            <div class='col-md-12'>
              <div class='card card-body bg-light mb-3'>
                <h3 class='text-center text-info'>User's Bio</h3>
                <p class='lead'>Introduction of the User</p>
                <hr />
                <h3 class='text-center text-info'>Hobbies</h3>
                <div class='row'>
                  <div class='d-flex flex-wrap justify-content-center align-items-center'>
                    <div class='p-3'>
                      <i class='fa fa-check' />
                      Swimming
                    </div>
                    <div class='p-3'>
                      <i class='fa fa-check' />
                      Basketball
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='row'>
            <div class='col-md-6'>
              <h3 class='text-center text-info'>Experience</h3>
              <ul class='list-group'>
                <li class='list-group-item'>
                  <h4>XXX</h4>
                  <p>XXX - XXX</p>
                  <p>
                    <strong>Position:</strong> XXXX
                  </p>
                  <p>
                    <strong>Description:</strong> XXX{' '}
                  </p>
                </li>
              </ul>
            </div>
            <div class='col-md-6'>
              <h3 class='text-center text-info'>Education</h3>
              <ul class='list-group'>
                <li class='list-group-item'>
                  <h4>Business School</h4>
                  <p>XXX - XXX</p>
                  <p>
                    <strong>Status: </strong>Freshman
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>XXX
                  </p>

                  <p>
                    <strong>Description:</strong> XXX
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
