import React, { Component } from 'react';

import './controls.scss';

class Controls extends Component {
  constructor (props) {
    super(props);

    this.state = {
      gameStartClass: '',
      gameInProgressClass: '',
      gameOverClass: 'hidden',
      gameTimer: null
    };

    this.startGame = this.startGame.bind(this);
  }

  startGame () {
    this.setState({
      gameStartClass: '',
      gameInProgressClass: 'invisible',
      gameOverClass: 'hidden',
      gameTimer: setTimeout(
        () => {
          this.setState({
            gameStartClass: 'hidden',
            gameInProgressClass: '',
            gameOverClass: ''
          });
        },
        20000
      )
    });
  }

  render () {
    return (
      <div className="controls-container">
        <div className={this.state.gameStartClass}>
          <h2>Click a frog</h2>
        </div>

        <div className={this.state.gameOverClass}>
          <h2>GAME OVER</h2>
        </div>

        <div className={this.state.gameInProgressClass}>
          <button className="btn btn-primary" onClick={this.startGame}>Start</button>
        </div>
      </div>
    );
  }
}

export default Controls;
