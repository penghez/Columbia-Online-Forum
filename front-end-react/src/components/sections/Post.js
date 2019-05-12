import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      commentElements: [],
      historyComments: {},
      postBody: {},
      cpContent: '',
      showModal: false,
      rcReplyTo: '',
      rcContent: '',
      rcAuthor: ''
    };
    // Comment on Post
    this.cpChange = this.cpChange.bind(this);
    this.cpSubmit = this.cpSubmit.bind(this);

    // Reply to Comment
    this.rcChange = this.rcChange.bind(this);
    this.rcSubmit = this.rcSubmit.bind(this);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // Reply to Comment
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
      ReplyTo: this.state.postBody['PostID']
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

  rcChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  rcSubmit(e) {
    e.preventDefault();

    const rcBody = {
      Author: localStorage.currentUserName,
      Content: this.state.rcContent,
      ReplyTo: this.state.rcReplyTo
    };

    axios
      .post('/forum-post/comment', {
        PostID: this.state.postBody['PostID'],
        Comment: rcBody
      })
      .then(res => {
        console.log(res);
        this.setState({
          rcContent: '',
          rcReplyTo: '',
          rcAuthor: ''
        });
        this.getAllPostData();
      })
      .catch(err => console.log(err));
  }

  showModal(e) {
    this.setState({
      showModal: true,
      rcReplyTo: e.target.value,
      rcAuthor: this.state.historyComments[e.target.value]['Author']
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  getAllPostData() {
    const currentPostID = this.props.location.state;
    // console.log(currentPostID);

    axios
      .get('/forum-post', {
        params: {
          PostID: currentPostID
        }
      })
      .then(res => {
        const postBody = res['data'];
        this.setState({ postBody });
        // console.log(this.state);

        const comments = postBody['Comment'];
        var historyComments = {};
        const commentElements = [];
        for (let n of comments) {
          var replyInfo = '';

          if (n['ReplyTo'] in historyComments) {
            replyInfo = (
              <div className='reply-bg col-md-12 '>
                <p className='text-muted pull-right'>
                  {historyComments[n['ReplyTo']]['Author']}:
                  <br />"{historyComments[n['ReplyTo']]['Content']}"
                </p>
              </div>
            );
          }

          const profileParam = {
            pathname: '/profile',
            state: n['Author']
          };
          const authorImg =
            'https://s3.amazonaws.com/columbia-forum/userImg/' +
            n['Author'] +
            '.png';
          commentElements.push(
            <div className='card card-body mb-3' key={n['PostID']}>
              <div className='row'>
                <div className='col-md-2'>
                  <Link to={profileParam}>
                    <img
                      className='rounded-circle d-none d-md-block'
                      src={authorImg}
                      alt=''
                    />
                  </Link>
                  <br />
                  <p className='text-center'>{n['Author']}</p>
                </div>
                <div className='col-md-10'>
                  {replyInfo}
                  <p>{n['Content']}</p>

                  <Button
                    variant='secondary'
                    size='sm'
                    value={n['PostID']}
                    onClick={this.showModal}>
                    Reply to {n['Author']}
                  </Button>
                </div>
              </div>
            </div>
          );

          historyComments[n['PostID']] = {
            Author: n['Author'],
            Content: n['Content']
          };
        }
        this.setState({ commentElements, historyComments });
      })
      .catch(err => console.log(err));
  }

  render() {
    const postUserParam = {
      pathname: '/profile',
      state: this.state.postBody['Author']
    };
    const userImg =
      'https://s3.amazonaws.com/columbia-forum/userImg/' +
      this.state.postBody['Author'] +
      '.png';

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card-header bg-primary text-white lead'>
            {this.state.postBody['Title']}
          </div>
          <div className='card card-body mb-3'>
            <div className='row'>
              <div className='col-md-2'>
                <Link to={postUserParam}>
                  <img
                    className='rounded-circle d-none d-md-block'
                    src={userImg}
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

          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reply to {this.state.rcAuthor}</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.rcSubmit}>
              <Modal.Body>
                <div className='form-group'>
                  <textarea
                    className='form-control'
                    rows='6'
                    placeholder='Create your reply'
                    name='rcContent'
                    value={this.state.rcContent}
                    onChange={this.rcChange}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={this.closeModal}>
                  Close
                </Button>
                <Button
                  variant='primary'
                  type='submit'
                  value='Submit'
                  onClick={this.closeModal}>
                  Reply
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

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
                        className='form-control'
                        rows='5'
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
