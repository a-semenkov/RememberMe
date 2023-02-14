import { format } from 'date-fns';

function formatDate(date: Date) {
  return format(date, 'dd-MM-yyyy');
}

export default formatDate;
