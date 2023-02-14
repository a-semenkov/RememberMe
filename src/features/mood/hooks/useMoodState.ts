import { useDispatch, useSelector } from 'react-redux';
import { clearMood, getMood } from '../../calendarEntry/entrySlice';

function useMoodState() {
  const dispatch = useDispatch();
  const mood = useSelector(getMood);

  const resetMood = () => dispatch(clearMood());
  return [mood, resetMood] as const;
}

export default useMoodState;
