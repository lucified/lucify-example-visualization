import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Dimensions = require('react-dimensions');

import { getSelectedDataForChart } from '../selectors';

import BarChart, { BarChartDatum } from './bar-chart';
import DataTypePicker from './data-type-picker';

import * as styles from './app.scss';

interface DimensionsProps {
  containerHeight: number;
  containerWidth: number;
}

interface StateProps {
  data: BarChartDatum[];
}

type Props = StateProps & DimensionsProps;

class App extends React.Component<Props> {
  public render() {
    const { data, containerWidth } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <DataTypePicker types={['2016', '2017']} />
        </div>
        <div className={styles.content}>
          <BarChart data={data} width={Math.min(600, containerWidth)} />
        </div>
      </div>
    );
  }
}

export default compose(
  Dimensions(),
  connect(state => ({ data: getSelectedDataForChart(state) })),
)(App) as React.ComponentClass;
