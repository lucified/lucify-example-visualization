import { YearlyData } from '../types';

export interface StateTree {
  data: DataTree;
  selections: SelectionsTree;
}

// Keys are of type DataType
export type DataTree = YearlyData[];

export interface SelectionsTree {
  year: string;
}
