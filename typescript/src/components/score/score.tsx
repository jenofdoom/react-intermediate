import React, { Component } from 'react';

import './score.scss';

interface State {
  score: number;
}

class Score extends Component<{}, State> {
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
