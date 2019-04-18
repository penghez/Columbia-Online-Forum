import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const newsList = ['Some news', 'Some news', 'Some news', 'Some news'];

class Home extends Component {
  render() {
    const newsElements = [];
    for (let n of newsList) {
      newsElements.push(
        <li className="list-group-item list-group-item-info single-news">
          <h4>{n}</h4>
        </li>
      );
    }

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3 className="text-center text-muted">Columbia News</h3>
                <ul className="list-group">{newsElements}</ul>
              </div>
              <div className="col-md-4">
                <h3 className="text-center text-muted">Daily life</h3>
                <ul className="list-group">{newsElements}</ul>
              </div>
              <div className="col-md-4">
                <h3 className="text-center text-muted">Job Hunting</h3>
                <ul className="list-group">{newsElements}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
