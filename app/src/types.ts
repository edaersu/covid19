export type numberOrNull = number | null;
export type stringOrNull = string | null;
export type StatisticResponse = {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: numberOrNull;
    active: numberOrNull;
    critical: numberOrNull;
    recovered: numberOrNull;
    '1M_pop': stringOrNull;
    total: numberOrNull;
  };
  deaths: {
    new: numberOrNull;
    '1M_pop': stringOrNull;
    total: numberOrNull;
  };
  tests: {
    '1M_pop': stringOrNull;
    total: numberOrNull;
  };
  day: string;
  time: string;
};

export type CountriesResponse = string;

export type ResponseModel<T> = {
  get: 'statistics' | 'countries' | 'history';
  parameters: { [x: string]: any };
  errors: Array<any>;
  results: number;
  response: T[];
};
