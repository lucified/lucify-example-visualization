export interface SetYearAction {
  type: 'SET_YEAR';
  year: string;
}

export interface ResetYearAction {
  type: 'RESET_YEAR';
}

export type Action = SetYearAction | ResetYearAction;
