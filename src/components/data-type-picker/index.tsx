import * as React from 'react';
import { connect } from 'react-redux';

import { setDataType } from '../../actions';
import { getSelectedType } from '../../selectors';
import * as styles from './index.scss';

interface StateProps {
  selectedType: string;
}

interface DispatchProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = StateProps & DispatchProps;

function DataTypePicker({ selectedType, handleChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.option}>
        <input
          type="radio"
          value="2016"
          checked={selectedType === '2016'}
          onChange={handleChange}
        />
        2016
      </label>
      <label className={styles.option}>
        <input
          type="radio"
          value="2017"
          checked={selectedType === '2017'}
          onChange={handleChange}
        />
        2017
      </label>
    </div>
  );
}

export default connect(
  state => ({ selectedType: getSelectedType(state) }),
  dispatch => ({
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDataType(e.currentTarget.value));
    },
  }),
)(DataTypePicker);
