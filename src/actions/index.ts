import { SetTypeAction } from './types';

export function setDataType(type: string): SetTypeAction {
  return {
    type: 'SET_TYPE',
    payload: type,
  };
}

export * from './types';
