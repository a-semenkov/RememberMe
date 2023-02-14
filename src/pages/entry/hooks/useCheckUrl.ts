import { useParams } from 'react-router-dom';
import checkValidDateUrl from '../../../utils/checkValidDateUrl';

const checkURL = (): string | null => {
  const { date } = useParams();

  if (!date) return null;

  if (checkValidDateUrl(date)) return date;

  return null;
};

export default checkURL;
