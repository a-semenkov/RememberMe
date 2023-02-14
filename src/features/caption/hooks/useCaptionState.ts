import { useDispatch, useSelector } from 'react-redux';
import { getCaption, setCaption } from '../../calendarEntry/entrySlice';

function useCaptionState() {
  const dispatch = useDispatch();
  const caption = useSelector(getCaption);
  const setNewCaption = (value: string): void => {
    if (value) {
      dispatch(setCaption(value));
      return;
    }
    dispatch(setCaption(null));
  };

  return [caption, setNewCaption] as const;
}

export default useCaptionState;
