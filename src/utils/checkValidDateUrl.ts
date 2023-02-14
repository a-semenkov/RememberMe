import { isFuture, isMatch, parse } from 'date-fns';

const checkValidDateUrl = (date: string): boolean => {
  const regexp =
    /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])-(0[1-9]|1[0-2])-(20)[2-4][0-9]$/;

  const parsedDate = parse(date, 'dd-MM-yyyy', new Date());

  if (regexp.test(date) && isMatch(date, 'dd-MM-yyyy') && !isFuture(parsedDate))
    return true;
  return false;
};

export default checkValidDateUrl;
