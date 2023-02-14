import MOOD_LIST from '../components/moodList';

function getMoodFromList(mood: string) {
  return MOOD_LIST.filter((item) => item.id === mood)[0].value;
}

export default getMoodFromList;
