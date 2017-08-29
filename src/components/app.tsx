import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Dimensions = require('react-dimensions');

import { getAllData, getSelectedDataForChart } from '../selectors';
import { YearlyData } from '../types';

import BarChart, { BarChartDatum } from './bar-chart';
import YearPicker from './year-picker';

import * as styles from './app.scss';

interface DimensionsProps {
  containerHeight: number;
  containerWidth: number;
}

interface StateProps {
  allData: YearlyData[];
  barChartData?: BarChartDatum[];
}

type Props = StateProps & DimensionsProps;

function App({ allData, barChartData, containerWidth }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <YearPicker years={allData.map(d => d.year)} />
      </div>
      <div className={styles.content}>
        {barChartData
          ? <BarChart
              data={barChartData}
              width={Math.min(600, containerWidth)}
            />
          : 'No data available for selected year'}
      </div>
    </div>
  );
}

export default compose(
  Dimensions(),
  connect<StateProps, void, DimensionsProps>(state => ({
    allData: getAllData(state),
    barChartData: getSelectedDataForChart(state),
  })),
)(App) as React.StatelessComponent;
