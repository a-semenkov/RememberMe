import { parse, startOfToday } from 'date-fns';
import { matchPath, useLocation } from 'react-router-dom';
import checkValidDateUrl from '../../../utils/checkValidDateUrl';

function useLocationData() {
  const location = useLocation();

  const match = matchPath(
    {
      path: '/photo/:date',
    },
    location.pathname
  );

  if (!match || !match.params.date || !checkValidDateUrl(match.params.date))
    return startOfToday();

  const date = parse(match.params.date, 'dd-MM-yyyy', new Date());

  return date;
}
export default useLocationData;
