import * as React from 'react';
import { connect } from 'react-redux';

import { setYear } from '../../actions';
import { getSelectedYear } from '../../selectors';
import * as styles from './index.scss';

interface PassedProps {
  years: string[];
}

interface StateProps {
  selectedYear: string;
}

interface DispatchProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = StateProps & DispatchProps & PassedProps;

function DataTypePicker({ selectedYear, handleChange, years }: Props) {
  return (
    <div className={styles.container}>
      {years.map(year =>
        <label key={year} className={styles.option}>
          <input
            type="radio"
            value={year}
            checked={selectedYear === year}
            onChange={handleChange}
          />
          {year}
        </label>,
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, PassedProps>(
  state => ({ selectedYear: getSelectedYear(state) }),
  dispatch => ({
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setYear(e.currentTarget.value));
    },
  }),
)(DataTypePicker);
