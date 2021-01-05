import useSWR from 'swr';
import { ReportModel } from '../types';

const halfHour = 1000 * 60 * 30;
const oneHour = halfHour * 2;
const _oneDay = oneHour * 24;

export const useReport = (date?: string) => {
  return useSWR<ReportModel | null>(date ? `daily?date=${date}` : null);
};
export const useLastReport = () => {
  return useSWR<ReportModel>('last');
};
