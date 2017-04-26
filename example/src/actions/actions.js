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
