import { CountriesResponse, ResponseModel, StatisticResponse } from '../types';
import request from './request';

export const getAvailableCountries = async () => {
  const result = await request.get<ResponseModel<CountriesResponse>>('/countries');

  return { totalItems: result.data.results, items: result.data.response };
};

export const getAllStatistics = async () => {
  const result = await request.get<ResponseModel<StatisticResponse>>('/statistics');

  return { totalItems: result.data.results, items: result.data.response };
};

// day YYYY-MM-DD
export const getStatisticHistory = async (country: string, day: string) => {
  const result = await request.get<ResponseModel<StatisticResponse>>('/history', {
    params: {
      country,
      day,
    },
  });

  return { item: result.data.response[0] };
};
