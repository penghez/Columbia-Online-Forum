import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-spinkit';

class JobHunting extends Component {
  constructor() {
    super();

    this.state = {
      conversationWithBot: '',
      respListItem: [],
      showModal: false,
      modalContent: ''
    };

    this.sendBoxChange = this.sendBoxChange.bind(this);
    this.sendQuestionToBot = this.sendQuestionToBot.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openJobLink = this.openJobLink.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  sendBoxChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  openJobLink(url) {
    window.open(url);
  }

  sendQuestionToBot(e) {
    e.preventDefault();

    if (this.state.conversationWithBot.toLowerCase() === 'yes') {
      this.setState({
        modalContent: (
          <div className='text-center'>
            <h4>
              Waiting for the crawler's result... May take about one minute...
            </h4>
            <div className='row'>
              <div className='col-md-5' />
              <div className='col-md-3'>
                <Spinner name='pacman' />
              </div>
              <div className='col-md-4' />
            </div>
          </div>
        )
      });
      this.showModal();
    }

    axios
      .get('https://j0tvkj2c86.execute-api.us-east-1.amazonaws.com/v1/bot', {
        params: {
          ask: this.state.conversationWithBot
        }
      })
      .then(res => {
        const botResp = res.data.botresp;
        console.log(botResp);
        if (this.state.conversationWithBot.toLowerCase() === 'yes') {
          const jobContentList = [];

          // TODO: LINK TYPE
          for (let i in botResp) {
            jobContentList.push(
              <tr
                className='job-item'
                key={i}
                onClick={this.openJobLink.bind(this, botResp[i]['Link'])}>
                <td>{botResp[i]['Title']}</td>
                <td>{botResp[i]['Company']}</td>
                <td>{botResp[i]['Location']}</td>
              </tr>
            );
          }

          this.setState({
            modalContent: (
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>{jobContentList}</tbody>
              </table>
            )
          });
        } else {
          this.state.respListItem.push(
            <li className='list-group-item' key={botResp}>
              <p className='text-muted'>{this.state.conversationWithBot}</p>
              {botResp}
            </li>
          );
        }

        this.setState({
          conversationWithBot: ''
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='JobHunting'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-body bg-info text-white mb-3'>
              <h4 className='display-5 text-center'>Job Hunting</h4>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <ul className='list-group'>{this.state.respListItem}</ul>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-info'>
              <div className='card-body'>
                <form
                  className='bs-example bs-example-form'
                  onSubmit={this.sendQuestionToBot}>
                  <div className='row'>
                    <div className='col-md-11'>
                      <input
                        className='form-control'
                        placeholder='Talk to the bot'
                        name='conversationWithBot'
                        type='text'
                        value={this.state.conversationWithBot}
                        onChange={this.sendBoxChange}
                      />
                    </div>

                    <div className='col-md-1'>
                      <span className='input-group-btn'>
                        <button type='submit' className='btn btn-info'>
                          Send
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.showModal} onHide={this.closeModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>The Result Jobs for You</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className='form-group'>{this.state.modalContent}</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default JobHunting;
