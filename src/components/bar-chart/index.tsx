import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { Transition, transition as d3Transition } from 'd3-transition'; // Extends d3-selection
import * as React from 'react';

export interface BarChartDatum {
  color: string;
  value: number;
  id: string;
}

interface Props {
  data: BarChartDatum[];
  width?: number;
  height?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

interface DefaultProps {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

type PropsWithDefaults = Props & DefaultProps;

export default class BarChart extends React.Component<Props> {
  private _xScale?: ScaleBand<string>;
  private _yScale?: ScaleLinear<number, number>;
  private _xAxisRef?: SVGGElement | null;
  private _yAxisRef?: SVGGElement | null;
  private transition: Transition<any, any, any, any>; // TODO: better typings

  public static defaultProps: DefaultProps = {
    width: 800,
    height: 400,
    marginLeft: 40,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 40,
  };

  constructor(props: Props) {
    super(props);

    this.transition = d3Transition('barchart').duration(250);
  }

  public componentDidMount() {
    this.drawYAxis(true);
    this.drawXAxis();
  }

  public componentWillReceiveProps(nextProps: Props) {
    // Invalidate caches depending on what changes
    if (nextProps.data !== this.props.data) {
      this._xScale = undefined;
      this._yScale = undefined;
    }

    if (nextProps.width !== this.props.width) {
      this._xScale = undefined;
    }

    if (nextProps.height !== this.props.height) {
      this._yScale = undefined;
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { data, width, height } = this.props;

    if (prevProps.data !== data || prevProps.height !== height) {
      this.drawYAxis(false);
    }

    if (prevProps.width !== width) {
      this.drawXAxis();
    }
  }

  private getContentWidth() {
    const { width, marginLeft, marginRight } = this.props as PropsWithDefaults;
    return width - marginLeft - marginRight;
  }

  private getContentHeight() {
    const { height, marginTop, marginBottom } = this.props as PropsWithDefaults;
    return height - marginTop - marginBottom;
  }

  private getXScale() {
    if (!this._xScale) {
      const { data } = this.props as PropsWithDefaults;
      this._xScale = scaleBand()
        .domain(data.map(d => d.id))
        .rangeRound([0, this.getContentWidth()])
        .padding(0.1);
    }

    return this._xScale;
  }

  private getYScale() {
    if (!this._yScale) {
      const { data } = this.props as PropsWithDefaults;
      this._yScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .rangeRound([this.getContentHeight(), 0]);
    }

    return this._yScale;
  }

  private drawXAxis() {
    select(this._xAxisRef!).call(axisBottom(this.getXScale()));
  }

  private drawYAxis(initialDraw: boolean) {
    if (initialDraw) {
      select(this._yAxisRef!).call(axisLeft(this.getYScale()));
    } else {
      select(this._yAxisRef!)
        .transition(this.transition)
        .call(axisLeft(this.getYScale()));
    }
  }

  public render() {
    const { data, width, height, marginLeft, marginTop } = this
      .props as PropsWithDefaults;
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    this.transition = d3Transition('barchart').duration(250);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${marginLeft},${marginTop})`}>
          <g
            ref={ref => (this._xAxisRef = ref)}
            transform={`translate(0,${this.getContentHeight()})`}
          />
          <g ref={ref => (this._yAxisRef = ref)} />
          {data.map(d =>
            <Bar
              key={d.id}
              x={xScale(d.id)!}
              y={yScale(d.value)}
              width={xScale.bandwidth()}
              height={this.getContentHeight() - yScale(d.value)}
              fill={d.color}
              transition={this.transition}
            />,
          )}
        </g>
      </svg>
    );
  }
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  transition: Transition<any, any, any, any>; // TODO: better typings
}

// tslint:disable:max-classes-per-file

class Bar extends React.Component<BarProps> {
  private _rectRef?: SVGElement | null;

  public componentDidMount() {
    this.updateHeight(true);
  }

  public componentDidUpdate(prevProps: BarProps) {
    if (prevProps.height !== this.props.height) {
      this.updateHeight(false);
    }
  }

  // We use D3 to handle the height while React handles other attributes
  private updateHeight(initialDraw: boolean) {
    const { y, height, transition } = this.props;

    if (initialDraw) {
      select(this._rectRef!).attr('y', y).attr('height', height);
    } else {
      select(this._rectRef!)
        .transition(transition)
        .attr('y', y)
        .attr('height', height);
    }
  }

  public render() {
    const { x, width, fill } = this.props;

    return (
      <rect
        x={x}
        width={width}
        fill={fill}
        ref={ref => (this._rectRef = ref)}
      />
    );
  }
}
