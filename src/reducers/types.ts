export interface StateTree {
  data: DataTree;
  selections: SelectionsTree;
}

export interface DataTree {
  2017: Votes;
  2016: Votes;
}

export interface SelectionsTree {
  type: keyof DataTree;
}

interface Votes {
  yes: number;
  no: number;
}
