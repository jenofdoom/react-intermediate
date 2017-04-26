import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'index.scss';
import Homepage from 'components/homepage/homepage';
import About from 'components/about/about';
import Nav from 'components/nav/nav';

ReactDOM.render(
  <Router>
    <div className="container-fluid">
      <Nav />
      <Route exact path="/" component={Homepage}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>,
  document.getElementById('app')
);
