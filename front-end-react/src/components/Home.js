import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const newsList = [
  'Some news',
  'Some news',
  'Some news',
  'Some news',
  'Some news'
];

class Home extends Component {
  render() {
    const newsListElements = [];
    for (let n of newsList) {
      newsListElements.push(
        <li className='list-group-item list-group-item-info single-news'>
          <h4>{n}</h4>
        </li>
      );
    }

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
                <ul className='list-group'>{newsListElements}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='news-title' to='/'>
                    Daily Life
                  </Link>
                </h3>
                <ul className='list-group'>{newsListElements}</ul>
              </div>
              <div className='col-md-4'>
                <h3 className='text-center text-muted'>
                  <Link className='news-title' to='/'>
                    Job Hunting
                  </Link>
                </h3>
                <ul className='list-group'>{newsListElements}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
