import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import Newslist from './components/sections/Newslist';
import Posts from './components/sections/Posts';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/newslist" component={Newslist} />
            <Route exact path="/posts" component={Posts} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
