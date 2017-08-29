import { createSelector } from 'reselect';

import { StateTree } from '../reducers';

export function getAllData(state: StateTree) {
  return state.data;
}

export function getSelectedYear(state: StateTree) {
  return state.selections.year;
}

export const getSelectedDataForChart = createSelector(
  getAllData,
  getSelectedYear,
  (data, year) => {
    const selectedData = data.find(d => d.year === year);

    return (
      selectedData && [
        { color: 'green', value: selectedData.votes.yes, id: 'yes' },
        { color: 'red', value: selectedData.votes.no, id: 'no' },
      ]
    );
  },
);
