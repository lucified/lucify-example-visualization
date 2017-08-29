import { combineReducers } from 'redux';

import { Action } from '../actions';
import { DataTree, SelectionsTree, StateTree } from './types';

export const initialState: StateTree = {
  data: require('../../data/data.json'),
  selections: { year: '2017' },
};

function dataReducer(state = initialState.data, _action: Action): DataTree {
  return state;
}

function selectionsReducer(
  state = initialState.selections,
  action: Action,
): SelectionsTree {
  switch (action.type) {
    case 'SET_YEAR':
      return {
        year: action.year,
      };
    case 'RESET_YEAR':
      return initialState.selections;
  }

  return state;
}

export default combineReducers<StateTree>({
  data: dataReducer,
  selections: selectionsReducer,
});

export * from './types';
