import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { createListObject } from '../../../utils/generateRandomKey';

interface IDates {
  id: string;
  value: Date;
}

export default function createDatesArray(month: Date): IDates[] {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { locale: ru }),
    end: endOfWeek(endOfMonth(month), { locale: ru }),
  }).map((item) => createListObject(item));
}
