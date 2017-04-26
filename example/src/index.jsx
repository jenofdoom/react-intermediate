import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store';

import 'index.scss';
import Homepage from 'components/homepage/homepage';
import About from 'components/about/about';
import Nav from 'components/nav/nav';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="container-fluid">
        <Nav />
        <Route exact path="/" component={Homepage}/>
        <Route path="/about" component={About}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
