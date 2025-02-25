import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/he';

dayjs.locale('he');

export const formatFullDate = (date: string | undefined) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  return dayjs(date).locale('he').format('HH:mm · DD/MM/YYYY');
};

export const formatTime = (date: string | undefined) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
  return dayjs(date).locale('he').format('DD/MM/YYYY');
};
