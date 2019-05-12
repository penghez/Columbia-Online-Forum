import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Auth } from 'aws-amplify';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      newsList: [],
      postList: [],
      jobList: []
    };

    this.setPostList = this.setPostList.bind(this);
    this.setNewsList = this.setNewsList.bind(this);
    this.setJobList = this.setJobList.bind(this);
  }

  componentDidMount() {
    // Auth.currentAuthenticatedUser()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    this.setPostList();
    this.setJobList();
    this.setNewsList();
  }

  setNewsList() {
    const news = [
      'CNN',
      'NY-times',
      'The Guardian',
      'Google News',
      'Medium',
      'Bloomberg'
    ];
    const newsList = [];
    for (var i = 0; i < 6; i++) {
      newsList.push(
        <div className='single-news'>
          <li className='list-group-item list-group-item-info text-info'>
            {news[i]}
          </li>
        </div>
      );
    }
    this.setState({ newsList });
  }

  setJobList() {
    const jobs = [
      'Indeed',
      'Linkedin',
      'Handshake',
      'Glassdoor',
      'ZipRecruiter',
      'Craiglist'
    ];
    const jobList = [];
    for (var i = 0; i < 6; i++) {
      jobList.push(
        <div className='single-news'>
          <li className='list-group-item list-group-item-info text-info'>
            {jobs[i]}
          </li>
        </div>
      );
    }
    this.setState({ jobList });
  }

  setPostList() {
    axios.get('/forum-post/all').then(res => {
      // console.log(res);
      const postList = [];
      for (var i = 0; i < Math.min(6, res['data'].length); i++) {
        const postPath = {
          pathname: '/post',
          state: res['data'][i]['PostID']
        };
        postList.push(
          <Link
            to={postPath}
            className=' single-news'
            key={res['data'][i]['PostID']}>
            <li className='list-group-item list-group-item-info text-info'>
              {res['data'][i]['Title']}
            </li>
          </Link>
        );
      }
      this.setState({ postList });
    });
  }

  render() {
    return (
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='link-type' to='/newslist'>
                    News Feed
                  </Link>
                </h3>
                <br />
                <ul className='list-group'>{this.state.newsList}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='link-type' to='/posts'>
                    Daily Life
                  </Link>
                </h3>
                <br />
                <ul className='list-group'>{this.state.postList}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='link-type' to='/jobhunting'>
                    Job Hunting
                  </Link>
                </h3>
                <br />
                <ul className='list-group'>{this.state.jobList}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
