import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      commentElements: [],
      postBody: {},
      cpContent: ''
    };
    // Comment on Post
    this.cpChange = this.cpChange.bind(this);
    this.cpSubmit = this.cpSubmit.bind(this);
    this.getAllPostData = this.getAllPostData.bind(this);
  }

  componentDidMount() {
    this.getAllPostData();
  }

  cpChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  cpSubmit(e) {
    e.preventDefault();

    const cpBody = {
      Author: localStorage.currentUserName,
      Content: this.state.cpContent,
      ReplyTo: this.state.postBody['Author']
    };

    axios
      .post('/forum-post/comment', {
        PostID: this.state.postBody['PostID'],
        Comment: cpBody
      })
      .then(res => {
        console.log(res);
        this.setState({
          cpContent: ''
        });
        this.getAllPostData();
      })
      .catch(err => console.log(err));
  }

  getAllPostData() {
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
        console.log(this.state);

        const comments = postBody['Comment'];
        const commentElements = [];
        for (let n of comments) {
          commentElements.push(
            <div className='card card-body mb-3' key={n['PostID']}>
              <div className='row'>
                <div className='col-md-2'>
                  <Link to='/'>
                    <img
                      className='rounded-circle d-none d-md-block'
                      src='https://www.gravatar.com/avatar/anything?s=200&d=mm'
                      alt=''
                    />
                  </Link>
                  <br />
                  <p className='text-center'>{n['Author']}</p>
                </div>
                <div className='col-md-10'>
                  <p className='text-muted'>Reply to: {n['ReplyTo']}</p>
                  <p>{n['Content']}</p>
                </div>
              </div>
            </div>
          );
        }
        this.setState({ commentElements });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card-header bg-primary text-white lead'>
            {this.state.postBody['Title']}
          </div>
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
                <p className='text-center'>{this.state.postBody['Author']}</p>
              </div>
              <div className='col-md-10'>
                <p>{this.state.postBody['Content']}</p>
              </div>
            </div>
          </div>

          {this.state.commentElements.length !== 0 && (
            <div className='card-header bg-success text-white'>Comments</div>
          )}
          {this.state.commentElements !== 0 && (
            <div className='comments'>{this.state.commentElements}</div>
          )}
          {/* <div className='card-header bg-success text-white'>Comments</div>
          <div className='comments'>{this.state.commentElements}</div> */}

          <div>
            <div className='post-form mb-3'>
              <div className='card card-info'>
                <div className='card-header bg-info text-white'>
                  Say Something...
                </div>
                <div className='card-body'>
                  <form onSubmit={this.cpSubmit}>
                    <div className='form-group'>
                      <textarea
                        className='form-control form-control'
                        placeholder='Create a post'
                        name='cpContent'
                        value={this.state.cpContent}
                        onChange={this.cpChange}
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
