import React from 'react';
import colors from '../Globals/colors';
import Donut from './Donut';

const MyDonut: React.FC<{
  max?: number;
  percentage?: number;
}> = ({ max, percentage }) => {
  return (
    <Donut
      color={colors.yellow}
      textColor={colors.textColorWhite}
      percentage={percentage}
      max={max}
      radius={80}
      strokeWidth={24}
    />
  );
};

export default MyDonut;
