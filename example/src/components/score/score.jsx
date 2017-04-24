import React, { Component } from 'react';

import './score.scss';

class Score extends Component {
  constructor (props) {
    super(props);

    this.state = {
      score: 0
    };
  }

  render () {
    return (
      <div className="score-container">
        Score: {this.state.score}
      </div>
    );
  }
}

export default Score;
