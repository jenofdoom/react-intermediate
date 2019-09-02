import { combineReducers } from 'redux';
import { START_GAME, ALTER_HOLES } from '../actions/actions';

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
