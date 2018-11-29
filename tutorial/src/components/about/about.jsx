import React, { Component } from 'react';

class About extends Component {
  render () {  
    return (
      <div>
        <div className="row mb-3">
          <div className="col">
            <h1>About</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>
              An example project for the 
              <a href="https://github.com/jenofdoom/react-intermediate">React Intermediate</a>
              training.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;