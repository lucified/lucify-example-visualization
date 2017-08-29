import { combineReducers } from 'redux';

import { Action } from '../actions';
import { StateTree } from './types';

export const initialState: StateTree = {
  data: require('../../data/data.json'),
  selections: { type: '2017' },
};

function dataReducer(state = initialState.data, _action: Action) {
  return state;
}

function selectionsReducer(state = initialState.selections, action: Action) {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        type: action.payload,
      };
    case 'RESET_TYPE':
      return initialState.selections;
  }

  return state;
}

export default combineReducers<StateTree>({
  data: dataReducer,
  selections: selectionsReducer,
});

export * from './types';
