import { DataType } from '../types';

export interface SetTypeAction {
  type: 'SET_TYPE';
  payload: DataType;
}

export interface ResetTypeAction {
  type: 'RESET_TYPE';
}

export type Action = SetTypeAction | ResetTypeAction;
