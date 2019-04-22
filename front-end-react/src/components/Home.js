import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    axios.get('/forum-post/all').then(res => {
      const postList = [];
      for (var i = 0; i < 5; i++) {
        postList.push(
          <li className='list-group-item list-group-item-info single-news'>
            <h4>{res['data'][i]['Title']}</h4>
          </li>
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
                  <Link className='news-title' to='/newslist'>
                    Columbia News
                  </Link>
                </h3>
                <ul className='list-group'>{this.state.newsList}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='news-title' to='/posts'>
                    Daily Life
                  </Link>
                </h3>
                <ul className='list-group'>{this.state.postList}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='news-title' to='/'>
                    Job Hunting
                  </Link>
                </h3>
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
