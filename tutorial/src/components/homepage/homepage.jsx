import React, { Component } from 'react';

import Hole from 'components/hole/hole';
import Score from 'components/score/score';
import Controls from 'components/controls/controls';
import './homepage.scss';

class Homepage extends Component {
  render () {
    let holes = [];

    for (let i = 0; i < 5; i++) {
      holes.push(<Hole key={'hole-' + i} id={i} />);
    }

    return (
      <div>
        <div className="row mb-3">
          <div className="col">
            <h1>Game</h1>
          </div>
        </div>
        <div className="row">
          <div className="col game">
            <Controls />
            {holes}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Score />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
