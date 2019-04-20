import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const newsContent = [['test', 'content'], ['test', 'content']];

class Newslist extends Component {
  render() {
    const newsContentElements = [];
    for (let n of newsContent) {
      newsContentElements.push(
        <div className='card card-body mb-3'>
          <div className='row'>
            <div className='col-md-2'>
              <Link to='/home'>
                <img
                  className='rounded-circle d-none d-md-block'
                  src=''
                  alt=''
                />
              </Link>
              <br />
              <p className='text-center'>{n[0]}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{n[1]}</p>
              <p>Content</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='posts'>{newsContentElements}</div>
        </div>
      </div>
    );
  }
}

export default Newslist;
