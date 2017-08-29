import { DataType } from '../types';

export interface StateTree {
  data: DataTree;
  selections: SelectionsTree;
}

// Keys are of type DataType
export interface DataTree {
  2017: Votes;
  2016: Votes;
}

export interface SelectionsTree {
  type: DataType;
}

interface Votes {
  yes: number;
  no: number;
}
