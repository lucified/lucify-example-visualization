import { createSelector } from 'reselect';

import { StateTree } from '../reducers';

function getDataTree(state: StateTree) {
  return state.data;
}

export function getSelectedType(state: StateTree) {
  return state.selections.type;
}

export const getSelectedDataForChart = createSelector(
  getDataTree,
  getSelectedType,
  (data, type) => {
    const selectedData = data[type];
    return [
      { color: 'green', value: selectedData.yes, id: 'yes' },
      { color: 'red', value: selectedData.no, id: 'no' },
    ];
  },
);
