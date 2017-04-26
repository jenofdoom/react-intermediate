# React intermediate training

## Getting started

If you have your own github account already, you might prefer to fork this
repository and clone that instead. If you don't just run the following commands
on a terminal or command line interface (assuming that your machine already has
[git available](https://git-scm.com/downloads)):

```
git clone https://github.com/jenofdoom/react-intermediate.git
cd js-build-pipelines-training
```

### Install node, npm and project dependencies

First, we need to install [node.js](https://nodejs.org/) and its package
manager, npm.

[Ubuntu/Debian/Mint instructions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

[Mac instructions](http://blog.teamtreehouse.com/install-node-js-npm-mac)

[Windows instructions](http://blog.teamtreehouse.com/install-node-js-npm-windows)

### Code editor

If you have a favourite code editor feel free to use that, but I recommend
[Atom](https://atom.io/).

In Atom, right click in the left panel, select `Add Project Folder` and open the
`react-intermediate/tutorial` folder. The `example` folder has a working version of what we'll be building.

In a terminal:

```
cd react-intermediate/tutorial
npm install
npm start
```

## Structuring for maintainability

There is a __lot__ of different opinions on this topic and you will see projects
that differ wildly. To a large extent it sort of depends on your project size... a very small project _could_ be just one file.

I've found that subfolders for components plus their styles and tests works, with separate folders for other types of constructs like actions and reducers works well for medium sized projects. The example projecct for today uses this structure.

For a much larger projects, you should consider a _fractal_ structure (see [this
discussion](http://www.developersite.org/103-121750-javascript) for some detail
on what that entails) where the prjecct is split into self contained functional
areas that contain all of their dependencies inline (so rather than having a
actions folder at the root of the src tree, the one action file that you need
for that piece is self contained there).
[react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
partially implements this pattern.

## Adding Redux for state management

Note that there are a _lot_ of different ways of structuring and implementing
redux applications. The [official
documentation](http://redux.js.org/docs/introduction/Examples.html) offers a
bunch of different examples with [source
code](https://github.com/reactjs/redux/tree/master/examples). The `async` and
`shopping-cart` examples are the closest to what we'll build today.

In a terminal in the tutorial folder:

```
npm install --save-dev redux redux-thunk redux-logger react-redux
```

### Wrap the application in a state provider

In `src/index.jsx`, add the Provider and store imports, and wrap the `Router` in
a `Provider`:

```
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
```

### Configure the state store

Create a new file in the `tutorial/src` folder called `store.js`:

```
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'reducers/reducers';

export default function configureStore() {
  const middleware = [ thunk ];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  return createStore(
    reducers,
    applyMiddleware(...middleware)
  );
}
```

We're still importing things that don't yet exist, we'd better fix that:

### Boilerplate for our reducers

Create a new folder, `tutorial/src/reducers` with a file in it called
`reducers.js`:

```
import { combineReducers } from 'redux';

const initialGameState = {};

const game = (state = initialGameState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default combineReducers({
  game
});
```

We've only set up one reducer, called `game`, but we've left our structure
flexible by using
[combineReducers](http://redux.js.org/docs/api/combineReducers.html) which means
we can break off sepearate chunks of state later, and potentiall even break
those out into separate files.

Right now the reducer only returns the initial state, as we aren't passing in
anything which sets new values.

### Connecting our hole components to the store

In `reducers.js`, we want to actually set the initial state up with an array of
the values for each hole (exporting the amount of holes we intend to have so we
can use that number elsewhere later):

```
export const holesLength = 5;

const initialGameState = {
  holeState: Array(holesLength).fill(false)
};
```

In `homepage.jsx` at the top of the file, we should import redux's connection
function:

```
import { connect } from 'react-redux';
```

and `export default Homepage;` at the bottom of the file becomes:

```
const mapStateToProps = (state) => {
  const { game } = state;
  const { holeState } = game;

  return { holeState };
}

export default connect(mapStateToProps)(Homepage);
```

`mapStateToProps` is where we unpack the data we recieve back from the reducer,
and set the props value that we care about up for the component to consume.

We should also add in the missing
[propTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html#proptypes)
for the prop we've just added - although it doesn't get passed in from the
parent like a normal prop, it still _is_ a prop:

```
Homepage.propTypes = {
  holeState: PropTypes.array.isRequired
};
```

Don't forget to import `PropTypes` at the top of the file:

```
import React, { Component, PropTypes } from 'react';
```

Now we're passing the data in, we should update our `for` loop that sets up the
holes with a new property, `active`:

```
for (let i = 0; i < this.props.holeState.length; i++) {
  holes.push(<Hole key={'hole-' + i} id={i} active={this.props.holeState[i]} />);
}
```

Alternatively, we could have connected each `hole` component individually to the store, but as we have an array of values rather that an object, that doesn't make much sense in this case.

In a redux application, it is __not__ necessary to connect every single
component up to the store. We can still use normal methods of passing props
between components where is makes sense to.

Now let's hook our new prop up in `hole.jsx` - we need to delete some exisiting
stuff first because we no longer want to be using state to control if the frog
is active, and we shoun't need our activate buttons any more either:

```
import React, { Component, PropTypes } from 'react';

import holeMask from 'assets/img/hole-mask.svg';
import './hole.scss';

class Hole extends Component {
  render () {
    let frogClass = 'frog';

    if (this.props.active) {
      frogClass = 'frog up';
    }

    return (
      <div className="hole-container">
        <div className="hole">
          <div className={frogClass}></div>
          <img src={holeMask} className='hole-mask' />
        </div>
      </div>
    );
  }
}

Hole.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Hole;
```

Now our component is connected (via its parent) to the store, if we change the
`initialGameState` values we can set some frogs on manually. Test that that
works by setting the `.fill()` in `reducers.jsx` to set all the values to `true`
intitally (and then set it back again once you're happy that that works).

### Our first action

To start the game, we want the user to hit the start button, which will trigger
one of the frogs popping up. When we want to trigger an action, we use a redux
function called 'dispatch'.

Make a new file, `actions/actions.js`:

```
export const START_GAME = 'START_GAME';

export const startGame = () => {
  return {
    type: START_GAME
  };
};
```

It is not strictly speaking necessary to set up the action type as a const, but
doing so ensures that we don't garble them as we need to use them both here and
in the reducer, too. See [the
docs](http://redux.js.org/docs/basics/Actions.html) for more on this.

The `startGame` function is an
[action-creator](http://redux.js.org/docs/basics/Actions.html#action-creators)
which must be invoked via a `dispatch` operation.

If we had a bigger application it would probably be wise to split our actions up into groups of different files by functional area.

In `controls.jsx`, first import the `connect` function and your action:

```
import { connect } from 'react-redux';
import { startGame } from 'actions/actions';
```

then at the beginning of the `startGame` method add a `dispatch` of that action:

```
  startGame () {
    this.props.dispatch(startGame());

~~~etc~~~
```

and at the bottom of the file, we still need to hook up `mapStateToProps` even
though we are only doing a dispatch not taking state back from the store:

```

Controls.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Controls);
```

In `reducers/reducers.js`, import the action type, add a new key value pair to
the `initialGameState`, and add a case for the action type:

```
import { combineReducers } from 'redux';
import { START_GAME } from 'actions/actions';

export const holesLength = 5;

const initialGameState = {
  holeState: Array(holesLength).fill(false),
  isGameActive: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
  case START_GAME:
    return Object.assign({}, state, {
      isGameActive: true
    });
  default:
    return state;
  }
};

export default combineReducers({
  game
});
```

### More complex actions

We can see from the console log that we are successfully manipulating the state,
but we aren't doing anything with those state changes as yet. Before we get to
that, let's first kick off our first frog popping up, as part of the start game
action.

In `actions/actions.js`:

```
import { holesLength } from 'reducers/reducers';

export const START_GAME = 'START_GAME';
export const ALTER_HOLES = 'ALTER_HOLES';

const startGame = () => {
  return {
    type: START_GAME
  };
};

const alterHoles = (holeState) => {
  return {
    type: ALTER_HOLES,
    holeState: holeState
  };
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const startGameAction = () => {
  return (dispatch, getState) => {
    dispatch(startGame());

    let newState = getState().game.holeState.slice(0);
    newState[getRandomInt(0, holesLength)] = true;
    dispatch(alterHoles(newState));
  };
};
```

Note that we had to create a new action (_not_ action creator) here,
`startGameAction`, to group togther our two dispatches plus some logic. The
action function has a weird structure - that's because we are using the
[thunk](https://github.com/gaearon/redux-thunk#motivation) middleware which
makes it so that we can delay the dispatch if we need to via an asynchronous
call (for example, for an API call), or so we can stick some logic in to make
the dispatch conditional.

In `controls.jsx`, update the name of the action we call:

```
import { startGameAction } from 'actions/actions';

~~~etc~~~

  startGame () {
    this.props.dispatch(startGameAction());

~~~etc~~~
```

In `reducers/reducers.js` let's add our new action type:

```
import { combineReducers } from 'redux';
import { START_GAME, ALTER_HOLES } from 'actions/actions';

export const holesLength = 5;

const initialGameState = {
  holeState: Array(holesLength).fill(false),
  isGameActive: false
};

const game = (state = initialGameState, action) => {
  switch (action.type) {
  case START_GAME:
    return Object.assign({}, state, {
      isGameActive: true
    });
  case ALTER_HOLES:
    return Object.assign({}, state, {
      holeState: action.holeState
    });
  default:
    return state;
  }
};

export default combineReducers({
  game
});

```

Clicking on the start should now trigger one of the frogs.

### Hooking the frogs up

Now we need a click action on the frogs that should trigger 1) hiding that frog
and 2) randomly popping up another. In `actions/actions.js`:

```
export const clickFrogAction = (frogId) => {
  return (dispatch, getState) => {
    let newState = getState().game.holeState.slice(0);

    newState[frogId] = false;
    dispatch(alterHoles(newState));

    setTimeout(
      () => {
        let newerState = newState.slice(0);
        newerState[getRandomInt(0, holesLength)] = true;
        dispatch(alterHoles(newerState));
      },
      700
    );
  };
};
```

You'll notice here that we perform a `slice` operation whenever we get the
curent state. That's because we want a copy of the array rather that a reference
to it. Reducers in redux _must_ have immutable state that gets overwritten
rather than mutated in order to properly trigger changes downstream.

In `holes.jsx` we should import the action (which means we have to hook the
component up to `connect`), and add back in a method for the click action on the
frog:

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import holeMask from 'assets/img/hole-mask.svg';
import { clickFrogAction } from 'actions/actions';
import './hole.scss';

class Hole extends Component {
  constructor (props) {
    super(props);

    this.frogClick = this.frogClick.bind(this);
  }

  frogClick () {
    this.props.dispatch(clickFrogAction(this.props.id));
  }

  render () {
    let frogClass = 'frog';

    if (this.props.active) {
      frogClass = 'frog up';
    }

    return (
      <div className="hole-container">
        <div className="hole">
          <div className={frogClass} onClick={this.frogClick}></div>
          <img src={holeMask} className='hole-mask' />
        </div>
      </div>
    );
  }
}

Hole.propTypes = {
  active: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Hole);
```

That should take care of chaining together all the frogs appearing. Now we have
a proper state store set up we can also navigate to the about page and back
without losing the state.

### Extensions

Try:

* setting up a END_GAME action that resets all the frogs to down
* setting up a score counter that increments on each click
* resetting the score to 0 on START_GAME
* making frogs dissapear automatically if they aren't clicked after an interval

## Fetch

## Testing with Jest

## Higher Order Components

A higher-order component, or
[HOC](https://facebook.github.io/react/docs/higher-order-components.html), is a
way of having reusable bits of logic that you would use to encapsulate varied
content - kind of like a decorator, but for components (or like Angular 1's
concept of transclusion).

## Making your React app production ready

Make sure that you use the [production
build](https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build)
of the React libraries. Practically speaking, if you are using webpack and the
`-p` flag, you are sorted.

In your application itself, if there are things that would want to make
conditional for development only (e.g. logging) you can wrap tham in a guard:

```
if (process.env.NODE_ENV !== 'production') {
  // your conditional stuff here
}
```

## A brief introduction to React Native
