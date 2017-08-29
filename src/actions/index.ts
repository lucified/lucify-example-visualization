import { DataType } from '../types';
import { SetTypeAction } from './types';

export function setDataType(type: DataType): SetTypeAction {
  return {
    type: 'SET_TYPE',
    payload: type,
  };
}

export * from './types';
