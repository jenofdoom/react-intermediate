import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hole from 'components/hole/hole';
import Score from 'components/score/score';
import Controls from 'components/controls/controls';
import './homepage.scss';

interface Props {
  holes: any;
}
class Homepage extends Component<Props> {
  render () {
    let holes = [];

    for (let i = 0; i < this.props.holeState.length; i++) {
      holes.push(<Hole key={'hole-' + i} id={i} active={this.props.holeState[i]} />);
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

Homepage.propTypes = {
  holeState: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  const { game } = state;
  const { holeState } = game;

  return { holeState };
};

export default connect(mapStateToProps)(Homepage);
