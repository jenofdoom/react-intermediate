import React, { Component } from 'react';

import holeMask from 'assets/img/hole-mask.svg';
import './hole.scss';

class Hole extends Component {
  constructor (props) {
    super(props);

    this.state = {
      frogActive: false
    };

    this.toggleFrog = this.toggleFrog.bind(this);
  }

  toggleFrog () {
    this.setState({
      frogActive: !this.state.frogActive
    });
  }

  render () {
    let frogClass = 'frog';

    if (this.state.frogActive) {
      frogClass = 'frog up';
    }

    return (
      <div className="hole-container">
        <button onClick={this.toggleFrog}>ACTIVATE</button>
        <div className="hole">
          <div className={frogClass}></div>
          <img src={holeMask} className='hole-mask' />
        </div>
      </div>
    );
  }
}

export default Hole;
