import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      postBody: {},
      comments: []
    };
  }

  componentDidMount() {
    const currentPostID = this.props.location.state;
    console.log(currentPostID);

    axios
      .get('/forum-post', {
        params: {
          PostID: currentPostID
        }
      })
      .then(res => {
        const postBody = res['data'];
        this.setState({ postBody });
      });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card-header bg-primary text-white lead'>
            {this.state.postBody['Title']}
          </div>
        </div>
        <div className='col-md-12'>
          <div className='card card-body mb-3'>
            <div className='row'>
              <div className='col-md-2'>
                <Link to='/home'>
                  <img
                    className='rounded-circle d-none d-md-block'
                    src='https://www.gravatar.com/avatar/anything?s=200&d=mm'
                    alt=''
                  />
                </Link>
                <br />
                <p className='text-center'>User1</p>
              </div>
              <div className='col-md-10'>
                <p>{this.state.postBody['Content']}</p>
              </div>
            </div>
          </div>

          <div>
            <div className='card-header bg-success text-white'>Comments</div>
          </div>
          <div className='comments'>
            <div className='card card-body mb-3'>
              <div className='row'>
                <div className='col-md-2'>
                  <a href='profile.html'>
                    <img
                      className='rounded-circle d-none d-md-block'
                      src='https://www.gravatar.com/avatar/anything?s=200&d=mm'
                      alt=''
                    />
                  </a>
                  <br />
                  <p className='text-center'>User3</p>
                </div>
                <div className='col-md-10'>
                  <p> Something funny</p>
                </div>
              </div>
            </div>

            <div className='post-form mb-3'>
              <div className='card card-info'>
                <div className='card-header bg-info text-white'>
                  Say Something...
                </div>
                <div className='card-body'>
                  <form>
                    <div className='form-group'>
                      <textarea
                        className='form-control form-control-lg'
                        placeholder='Create a post'
                      />
                    </div>
                    <button type='submit' className='btn btn-dark'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
