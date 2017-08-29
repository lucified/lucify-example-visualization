export interface SetTypeAction {
  type: 'SET_TYPE';
  payload: string;
}

export interface ResetTypeAction {
  type: 'RESET_TYPE';
}

export type Action = SetTypeAction | ResetTypeAction;
