import { SetYearAction } from './types';

export function setYear(year: string): SetYearAction {
  return {
    type: 'SET_YEAR',
    year,
  };
}

export * from './types';
