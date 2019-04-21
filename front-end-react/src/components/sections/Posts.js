import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const newsContent = [['test', 'content'], ['test', 'content']];

class Posts extends Component {
  render() {
    const newsContentElements = [];
    for (let n of newsContent) {
      newsContentElements.push(
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <Link to="/home">
                <img
                  className="rounded-circle d-none d-md-block"
                  src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                />
              </Link>
              <br />
              <p className="text-center">{n[0]}</p>
            </div>
            <div className="col-md-10">
              <Link to="home">
                <p className="lead">{n[1]}</p>
                <p>Content</p>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="1"
                      placeholder="Create the title"
                    />
                    <br />
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Create a post"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="posts">{newsContentElements}</div>
        </div>
      </div>
    );
  }
}

export default Posts;
