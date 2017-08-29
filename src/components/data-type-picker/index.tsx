import * as React from 'react';
import { connect } from 'react-redux';

import { setDataType } from '../../actions';
import { getSelectedType } from '../../selectors';
import { DataType } from '../../types';
import * as styles from './index.scss';

interface PassedProps {
  types: DataType[];
}

interface StateProps {
  selectedType: string;
}

interface DispatchProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = StateProps & DispatchProps & PassedProps;

function DataTypePicker({ selectedType, handleChange, types }: Props) {
  return (
    <div className={styles.container}>
      {types.map(type =>
        <label key={type} className={styles.option}>
          <input
            type="radio"
            value={type}
            checked={selectedType === type}
            onChange={handleChange}
          />
          {type}
        </label>,
      )}
    </div>
  );
}

export default connect<StateProps, DispatchProps, PassedProps>(
  state => ({ selectedType: getSelectedType(state) }),
  dispatch => ({
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDataType(e.currentTarget.value as DataType));
    },
  }),
)(DataTypePicker);
