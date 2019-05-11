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
  }

  componentDidMount() {
    // Auth.currentAuthenticatedUser()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

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
                    Columbia News
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
                  <Link className='link-type' to='/'>
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
