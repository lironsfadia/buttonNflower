import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export const formatDate = (date: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  return dayjs(date).format('ddd DD, MMM · HH:mm A');
};
