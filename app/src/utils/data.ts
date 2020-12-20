import useSWR from 'swr';
import { CountriesResponse, ResponseModel, StatisticResponse } from '../types';

const halfHour = 1000 * 60 * 30;
const oneHour = 1000 * 60 * 60;
const oneDay = oneHour * 24;

export const useCountries = () => {
  const result = useSWR<ResponseModel<CountriesResponse>>('/countries', {
    dedupingInterval: oneDay,
  });

  return { ...result, items: result.data?.response, totalItems: result.data?.results };
};

export const useStatistics = () => {
  const result = useSWR<ResponseModel<StatisticResponse>>('/statistics', {
    dedupingInterval: halfHour,
  });

  return { ...result, items: result.data?.response, totalItems: result.data?.results };
};

export const useHistory = (country: string, day: string) => {
  const result = useSWR<ResponseModel<StatisticResponse>>(
    !country || !day ? null : `/history?country=${country}&day=${day}`,
  );

  return { ...result, data: result.data?.response[0] };
};
