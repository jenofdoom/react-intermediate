import React, { Component } from 'react';

import holeMask from 'assets/img/hole-mask.svg';
import './hole.scss';

class Hole extends Component {
  constructor (props) {
    super(props);

    this.state = {
      frogActive: false
    };

    this.activateFrog = this.activateFrog.bind(this);
    this.deactivateFrog = this.deactivateFrog.bind(this);
  }

  activateFrog () {
    this.setState({
      frogActive: true
    });
  }

  deactivateFrog () {
    this.setState({
      frogActive: false
    });
  }

  render () {
    let frogClass = 'frog';

    if (this.state.frogActive) {
      frogClass = 'frog up';
    }

    return (
      <div className="hole-container">
        <button onClick={this.activateFrog}>ACTIVATE</button>
        <button onClick={this.deactivateFrog}>DEACTIVATE</button>
        <div className="hole">
          <div className={frogClass}></div>
          <img src={holeMask} className='hole-mask' />
        </div>
      </div>
    );
  }
}

export default Hole;
